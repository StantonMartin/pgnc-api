import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import {
    IsArray,
    IsDate,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsObject,
    IsString,
    ValidateNested,
} from 'class-validator';
import { nomenclatureType } from 'src/common/enum/nomenclature-type.enum';
import { geneStatus } from '../../enum/gene-status.enum';
import { LocationDto } from './gene/location.dto';
import { LocusTypeDto } from './gene/locus-type.dto';
import { NameDto } from './gene/name.dto';
import { NoteDto } from './gene/note.dto';
import { ReplacedDto } from './gene/replaced.dto';
import { ReplacementDto } from './gene/replacement.dto';
import { SpeciesDto } from './gene/species.dto';
import { SymbolDto } from './gene/symbol.dto';
import { XrefDto } from './gene/xref.dto';

@Exclude()
export class GeneDto {
    @ApiProperty({
        description: 'The gene ID',
        example: 1,
    })
    @IsInt()
    @IsNotEmpty()
    @Expose()
    id: number;

    @ApiProperty({
        description: 'The gene creation date',
        example: '2021-01-01T00:00:00.000Z',
    })
    @IsDate()
    @IsNotEmpty()
    @Expose()
    creationDate: Date;

    @ApiProperty({
        description: 'The gene modification date',
        example: '2021-01-01T00:00:00.000Z',
    })
    @IsDate()
    @IsNotEmpty()
    @Expose()
    modDate: Date;

    @ApiPropertyOptional({
        description: 'The gene withdrawal date',
        example: '2021-01-01T00:00:00.000Z',
    })
    @IsDate()
    @Expose()
    withdrawnDate?: Date | null;

    @ApiProperty({
        enum: geneStatus,
        description: 'The status of the gene',
        example: 'internal',
    })
    @IsEnum(geneStatus)
    @Expose()
    status: geneStatus;

    @ApiProperty({
        description: 'The species',
        type: 'object',
        properties: {
            commonName: {
                type: 'string',
                example: 'Poplar',
            },
            scientificName: {
                type: 'string',
                example: 'Populus trichocarpa',
            },
        },
    })
    @IsObject()
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Expose()
    @Type(() => SpeciesDto)
    species: SpeciesDto;

    @ApiProperty({
        description: 'The gene names',
        type: 'array',
        items: {
            type: 'object',
            properties: {
                type: {
                    type: 'string',
                    enum: Object.values(nomenclatureType),
                    example: 'approved',
                },
                creationDate: {
                    type: 'string',
                    format: 'date-time',
                    example: '2021-01-01T00:00:00.000Z',
                },
                modDate: {
                    type: 'string',
                    format: 'date-time',
                    example: '2021-01-01T00:00:00.000Z',
                },
                withdrawnDate: {
                    type: 'string',
                    format: 'date-time',
                    example: '2021-01-01T00:00:00.000Z',
                    nullable: true,
                },
                name: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            example: 'AT1G01010',
                        },
                    },
                },
            },
        },
    })
    @IsArray()
    @Expose()
    @Type(() => NameDto)
    geneNames: NameDto[];

    @ApiProperty({
        description: 'The gene symbols',
        type: 'array',
        items: {
            type: 'object',
            properties: {
                type: {
                    type: 'string',
                    enum: Object.values(nomenclatureType),
                    example: 'approved',
                },
                creationDate: {
                    type: 'string',
                    format: 'date-time',
                    example: '2021-01-01T00:00:00.000Z',
                },
                modDate: {
                    type: 'string',
                    format: 'date-time',
                    example: '2021-01-01T00:00:00.000Z',
                },
                withdrawnDate: {
                    type: 'string',
                    format: 'date-time',
                    example: '2021-01-01T00:00:00.000Z',
                    nullable: true,
                },
                symbol: {
                    type: 'object',
                    properties: {
                        symbol: {
                            type: 'string',
                            example: 'BRAF',
                        },
                    },
                },
            },
        },
    })
    @IsArray()
    @IsObject({ each: true })
    @Expose()
    @Type(() => SymbolDto)
    geneSymbols: SymbolDto[];

    @ApiProperty({
        description: 'The gene locus types',
        type: 'array',
        items: {
            type: 'object',
            properties: {
                creationDate: {
                    type: 'string',
                    format: 'date-time',
                    example: '2021-01-01T00:00:00.000Z',
                },
                modDate: {
                    type: 'string',
                    format: 'date-time',
                    example: '2021-01-01T00:00:00.000Z',
                },
                withdrawnDate: {
                    type: 'string',
                    format: 'date-time',
                    example: '2021-01-01T00:00:00.000Z',
                    nullable: true,
                },
                locusType: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            example: 'Gene with protein product',
                        },
                        locusGroup: {
                            type: 'object',
                            properties: {
                                name: {
                                    type: 'string',
                                    example: 'Protein coding',
                                },
                            },
                        },
                    },
                },
            },
        },
    })
    @IsArray()
    @IsObject({ each: true })
    @Expose()
    @Type(() => LocusTypeDto)
    geneLocusTypes: LocusTypeDto[];

    @ApiPropertyOptional({
        description: 'The gene notes',
        type: 'array',
        items: {
            type: 'object',
            properties: {
                creationDate: {
                    type: 'string',
                    format: 'date-time',
                    example: '2021-01-01T00:00:00.000Z',
                },
                modDate: {
                    type: 'string',
                    format: 'date-time',
                    example: '2021-01-01T00:00:00.000Z',
                },
                withdrawnDate: {
                    type: 'string',
                    format: 'date-time',
                    example: '2021-01-01T00:00:00.000Z',
                    nullable: true,
                },
                note: {
                    type: 'object',
                    properties: {
                        note: {
                            type: 'string',
                            example: 'This is a note',
                        },
                    },
                },
            },
        },
    })
    @IsArray()
    @IsObject({ each: true })
    @Expose()
    @Type(() => NoteDto)
    geneNotes?: NoteDto[] | [];

    @ApiPropertyOptional({
        description: 'The gene replacements',
        type: 'array',
        items: {
            type: 'object',
            properties: {
                replacementId: {
                    type: 'number',
                    example: 1,
                },
                date: {
                    type: 'string',
                    format: 'date-time',
                    example: '2021-01-01T00:00:00.000Z',
                },
            },
        },
    })
    @IsArray()
    @IsObject({ each: true })
    @Expose()
    @Type(() => ReplacementDto)
    geneReplacements?: ReplacementDto[] | [];

    @ApiPropertyOptional({
        description: 'The gene replaced',
        type: 'array',
        items: {
            type: 'object',
            properties: {
                previousId: {
                    type: 'number',
                    example: 1,
                },
                date: {
                    type: 'string',
                    format: 'date-time',
                    example: '2021-01-01T00:00:00.000Z',
                },
            },
        },
    })
    @IsArray()
    @IsObject({ each: true })
    @Expose()
    @Type(() => ReplacedDto)
    genesReplaced?: ReplacedDto[] | [];

    @ApiPropertyOptional({
        description: 'The xrefs of the gene',
        type: [XrefDto],
    })
    @IsArray()
    @IsObject({ each: true })
    @Expose()
    @Type(() => XrefDto)
    geneXrefs?: XrefDto[] | [];

    @ApiProperty({
        description: 'The gene locations',
        type: [LocationDto],
    })
    @IsArray()
    @IsObject({ each: true })
    @Expose()
    @Type(() => LocationDto)
    geneLocations: LocationDto[];

    @ApiProperty({
        description: 'The primary gene ID',
        example: 'Potri.006G135200',
    })
    @IsString()
    @IsNotEmpty()
    @Expose()
    primaryId: string;

    @ApiProperty({
        description: 'The primary gene ID source',
        example: 'Phytozome v4_1',
    })
    @IsString()
    @IsNotEmpty()
    @Expose()
    primaryIdSource: string;
}
