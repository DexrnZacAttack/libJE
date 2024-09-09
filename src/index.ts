import * as NBT from "nbtify";

export const regionSectorSize = 4096;

export interface Location {
    offset: number,
    size: number
};

export enum CompressionType {
    GZIP = 1,
    ZLIB
};

export interface Chunk {
    data: data
};

export interface data {
    Level: Level;
    DataVersion: NBT.IntTag;
}

export interface Level extends NBT.CompoundTag {
  LightPopulated: NBT.ByteTag;
  zPos: NBT.IntTag;
  HeightMap: NBT.IntArrayTag;
  Sections: Section[];
  LastUpdate: NBT.LongTag;
  Biomes: NBT.ByteArrayTag;
  InhabitedTime: NBT.LongTag;
  xPos: NBT.IntTag;
  TerrainPopulated: NBT.ByteTag;
  TileEntities: any[];
  Entities: any[];
}

export interface Section extends NBT.CompoundTag {
  Blocks: NBT.ByteArrayTag;
  SkyLight: NBT.ByteArrayTag;
  Y: NBT.ByteTag;
  BlockLight: NBT.ByteArrayTag;
  Data: NBT.ByteArrayTag;
}

export interface RegionChunk {
    offset: number,
    size: number,
    compressedSize: number,
    compressionType: CompressionType,
    timestamp: number,
    data: Chunk
};