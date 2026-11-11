import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  HumanTrait,
  HumanTraitDocument,
} from '../schema/wiki/compendium/human-trait.schema';
import {
  CompendiumFeat,
  CompendiumFeatDocument,
  FeatCategory,
} from '../schema/wiki/compendium/compendium-feat.schema';
import {
  CompendiumStyle,
  CompendiumStyleDocument,
} from '../schema/wiki/compendium/compendium-style.schema';
import {
  CompendiumArchetype,
  CompendiumArchetypeDocument,
} from '../schema/wiki/compendium/compendium-archetype.schema';
import {
  CompendiumItem,
  CompendiumItemDocument,
} from '../schema/wiki/compendium/compendium-item.schema';
import { COMPENDIUM_CATALOGS } from '../schema/wiki/compendium/compendium-mechanics.types';
import { DEFAULT_HUMAN_TRAITS } from './seeds/human-traits.seed';
import { DEFAULT_ORIGIN_FEATS } from './seeds/origin-feats.seed';
import {
  DEFAULT_ARCHETYPES,
  DEFAULT_STYLES,
} from './seeds/styles-and-archetypes.seed';
import { DEFAULT_GENERAL_FEATS } from './seeds/general-feats.seed';
import { DEFAULT_COMPENDIUM_ITEMS } from './seeds/items.seed';

@Injectable()
export class CompendiumService implements OnModuleInit {
  private readonly logger = new Logger(CompendiumService.name);

  constructor(
    @InjectModel(HumanTrait.name)
    private readonly traitModel: Model<HumanTraitDocument>,
    @InjectModel(CompendiumFeat.name)
    private readonly featModel: Model<CompendiumFeatDocument>,
    @InjectModel(CompendiumStyle.name)
    private readonly styleModel: Model<CompendiumStyleDocument>,
    @InjectModel(CompendiumArchetype.name)
    private readonly archetypeModel: Model<CompendiumArchetypeDocument>,
    @InjectModel(CompendiumItem.name)
    private readonly itemModel: Model<CompendiumItemDocument>,
  ) { }

  async onModuleInit() {
    await this.seedDefaults();
  }

  async seedDefaults() {
    try {
      // 1. Seed Human Traits
      for (const trait of DEFAULT_HUMAN_TRAITS) {
        await this.traitModel.updateOne(
          { slug: trait.slug },
          { $set: { ...trait, isDefault: true } },
          { upsert: true },
        );
      }

      // 2. Seed Origin Feats
      for (const feat of DEFAULT_ORIGIN_FEATS) {
        await this.featModel.updateOne(
          { slug: feat.slug },
          { $set: { ...feat, category: 'ORIGIN', isDefault: true } },
          { upsert: true },
        );
      }

      // 3. Seed General Feats
      for (const feat of DEFAULT_GENERAL_FEATS) {
        await this.featModel.updateOne(
          { slug: feat.slug },
          { $set: { ...feat, category: 'GENERAL', isDefault: true } },
          { upsert: true },
        );
      }

      // 4. Seed Styles
      for (const style of DEFAULT_STYLES) {
        await this.styleModel.updateOne(
          { slug: style.slug },
          { $set: { ...style, isDefault: true } },
          { upsert: true },
        );
      }

      // 5. Seed Archetypes
      for (const archetype of DEFAULT_ARCHETYPES) {
        await this.archetypeModel.updateOne(
          { slug: archetype.slug },
          { $set: { ...archetype, isDefault: true } },
          { upsert: true },
        );
      }

      // 6. Seed Items (Weapons, Armors, Shields, Tools, Ammo)
      for (const item of DEFAULT_COMPENDIUM_ITEMS) {
        await this.itemModel.updateOne(
          { slug: item.slug },
          { $set: { ...item, isDefault: true } },
          { upsert: true },
        );
      }

      this.logger.log(
        'Compendio Durmiente: Datos por defecto sincronizados correctamente.',
      );
    } catch (error) {
      this.logger.error(
        'Error al sincronizar los datos por defecto del Compendio Durmiente',
        error,
      );
    }
  }

  private slugify(text: string): string {
    const base = (text || 'item')
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return `${base}-${Date.now().toString(36)}`;
  }

  // ==========================================
  // CATALOGS & EXPORT FOR CHARACTER BUILDER
  // ==========================================
  getCatalogs() {
    return COMPENDIUM_CATALOGS;
  }

  async getFullExport() {
    const [traits, originFeats, generalFeats, styles, archetypes, items] =
      await Promise.all([
        this.findAllTraits(),
        this.findAllFeats('ORIGIN'),
        this.findAllFeats('GENERAL'),
        this.findAllStyles(),
        this.findAllArchetypes(),
        this.findAllItems(),
      ]);

    return {
      catalogs: COMPENDIUM_CATALOGS,
      traits,
      originFeats,
      generalFeats,
      styles,
      archetypes,
      items,
    };
  }

  // ==========================================
  // 1. RASGOS HUMANOS (TRAITS)
  // ==========================================
  async findAllTraits(): Promise<HumanTrait[]> {
    return this.traitModel.find().sort({ pointCost: 1, name: 1 }).exec();
  }

  async createTrait(dto: Partial<HumanTrait>): Promise<HumanTrait> {
    const payload = {
      ...dto,
      slug: this.slugify(dto.name || 'rasgo'),
      isDefault: false,
    };
    const created = new this.traitModel(payload);
    return created.save();
  }

  async updateTrait(
    id: string,
    dto: Partial<HumanTrait>,
  ): Promise<HumanTrait> {
    const existing = await this.traitModel.findById(id).exec();
    if (!existing) {
      throw new NotFoundException('Rasgo humano no encontrado');
    }
    if (existing.isDefault) {
      throw new ForbiddenException(
        'Los rasgos por defecto del Compendio Durmiente no pueden ser editados.',
      );
    }

    const { isDefault, slug, ...safeUpdate } = dto as any;
    return this.traitModel
      .findByIdAndUpdate(id, { $set: safeUpdate }, { new: true })
      .exec();
  }

  async deleteTrait(id: string): Promise<void> {
    const existing = await this.traitModel.findById(id).exec();
    if (!existing) {
      throw new NotFoundException('Rasgo humano no encontrado');
    }
    if (existing.isDefault) {
      throw new ForbiddenException(
        'Los rasgos por defecto del Compendio Durmiente no pueden ser eliminados.',
      );
    }
    await this.traitModel.findByIdAndDelete(id).exec();
  }

  // ==========================================
  // 2. DOTES DE ORIGEN Y GENERALES (FEATS)
  // ==========================================
  async findAllFeats(category?: FeatCategory): Promise<CompendiumFeat[]> {
    const filter = category ? { category } : {};
    return this.featModel.find(filter).sort({ name: 1 }).exec();
  }

  async createFeat(dto: Partial<CompendiumFeat>): Promise<CompendiumFeat> {
    const payload = {
      ...dto,
      slug: this.slugify(dto.name || 'dote'),
      isDefault: false,
    };
    const created = new this.featModel(payload);
    return created.save();
  }

  async updateFeat(
    id: string,
    dto: Partial<CompendiumFeat>,
  ): Promise<CompendiumFeat> {
    const existing = await this.featModel.findById(id).exec();
    if (!existing) {
      throw new NotFoundException('Dote no encontrada');
    }
    if (existing.isDefault) {
      throw new ForbiddenException(
        'Las dotes por defecto del Compendio Durmiente no pueden ser editadas.',
      );
    }

    const { isDefault, slug, ...safeUpdate } = dto as any;
    return this.featModel
      .findByIdAndUpdate(id, { $set: safeUpdate }, { new: true })
      .exec();
  }

  async deleteFeat(id: string): Promise<void> {
    const existing = await this.featModel.findById(id).exec();
    if (!existing) {
      throw new NotFoundException('Dote no encontrada');
    }
    if (existing.isDefault) {
      throw new ForbiddenException(
        'Las dotes por defecto del Compendio Durmiente no pueden ser eliminadas.',
      );
    }
    await this.featModel.findByIdAndDelete(id).exec();
  }

  // ==========================================
  // 3. ESTILOS (STYLES)
  // ==========================================
  async findAllStyles(): Promise<CompendiumStyle[]> {
    return this.styleModel.find().sort({ isDefault: -1, name: 1 }).exec();
  }

  async createStyle(dto: Partial<CompendiumStyle>): Promise<CompendiumStyle> {
    const payload = {
      ...dto,
      slug: this.slugify(dto.name || 'estilo'),
      isDefault: false,
    };
    const created = new this.styleModel(payload);
    return created.save();
  }

  async updateStyle(
    id: string,
    dto: Partial<CompendiumStyle>,
  ): Promise<CompendiumStyle> {
    const existing = await this.styleModel.findById(id).exec();
    if (!existing) {
      throw new NotFoundException('Estilo no encontrado');
    }
    if (existing.isDefault) {
      throw new ForbiddenException(
        'Los estilos por defecto del Compendio Durmiente no pueden ser editados.',
      );
    }

    const { isDefault, slug, ...safeUpdate } = dto as any;
    return this.styleModel
      .findByIdAndUpdate(id, { $set: safeUpdate }, { new: true })
      .exec();
  }

  async deleteStyle(id: string): Promise<void> {
    const existing = await this.styleModel.findById(id).exec();
    if (!existing) {
      throw new NotFoundException('Estilo no encontrado');
    }
    if (existing.isDefault) {
      throw new ForbiddenException(
        'Los estilos por defecto del Compendio Durmiente no pueden ser eliminados.',
      );
    }
    await this.styleModel.findByIdAndDelete(id).exec();
  }

  // ==========================================
  // 4. ARQUETIPOS (ARCHETYPES)
  // ==========================================
  async findAllArchetypes(): Promise<CompendiumArchetype[]> {
    return this.archetypeModel.find().sort({ name: 1 }).exec();
  }

  async createArchetype(
    dto: Partial<CompendiumArchetype>,
  ): Promise<CompendiumArchetype> {
    const payload = {
      ...dto,
      slug: this.slugify(dto.name || 'arquetipo'),
      isDefault: false,
    };
    const created = new this.archetypeModel(payload);
    return created.save();
  }

  async updateArchetype(
    id: string,
    dto: Partial<CompendiumArchetype>,
  ): Promise<CompendiumArchetype> {
    const existing = await this.archetypeModel.findById(id).exec();
    if (!existing) {
      throw new NotFoundException('Arquetipo no encontrado');
    }
    if (existing.isDefault) {
      throw new ForbiddenException(
        'Los arquetipos por defecto del Compendio Durmiente no pueden ser editados.',
      );
    }

    const { isDefault, slug, ...safeUpdate } = dto as any;
    return this.archetypeModel
      .findByIdAndUpdate(id, { $set: safeUpdate }, { new: true })
      .exec();
  }

  async deleteArchetype(id: string): Promise<void> {
    const existing = await this.archetypeModel.findById(id).exec();
    if (!existing) {
      throw new NotFoundException('Arquetipo no encontrado');
    }
    if (existing.isDefault) {
      throw new ForbiddenException(
        'Los arquetipos por defecto del Compendio Durmiente no pueden ser eliminados.',
      );
    }
    await this.archetypeModel.findByIdAndDelete(id).exec();
  }

  // ==========================================
  // 5. OBJETOS, ARMAS Y EQUIPO (ITEMS)
  // ==========================================
  async findAllItems(category?: string): Promise<CompendiumItem[]> {
    const filter: any = {};
    if (category) {
      filter.category = category;
    }
    return this.itemModel.find(filter).sort({ category: 1, name: 1 }).exec();
  }

  async findItemBySlug(slug: string): Promise<CompendiumItem | null> {
    return this.itemModel.findOne({ slug }).exec();
  }
}
