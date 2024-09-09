import { bReader } from "binaryio.js"
import { readFileSync, writeFileSync } from "fs";
import * as NBT from "nbtify";
import { RegionChunk, Location, regionSectorSize, CompressionType } from "../index.js";

async function readRegion(region: Uint8Array) {
    const reader = new bReader(region, false);

    const locationTable: Location[] = [];
    const timestamps: number[] = [];
    const chunks: RegionChunk[] = [];

    for (var i = 0; i < 0x1000; i += 4)
        locationTable.push({offset: (reader.readUInt24() * regionSectorSize), size: (reader.readByte() * regionSectorSize)});

    
    for (var i = 0; i < 0x1000; i += 4)
        timestamps.push(reader.readUInt());

    for (var i = 0; i < locationTable.length; i++) {
        if (locationTable[i].size === 0)
            continue;

        reader.setPos(locationTable[i].offset);
        const compSize = reader.readUInt();
        const compType: CompressionType = reader.readByte();

        const compressedChunk = reader.read(compSize);

        chunks.push({offset: (locationTable[i].offset), size: (locationTable[i].size), compressedSize: compSize, compressionType: compType, timestamp: timestamps[i], data: await NBT.read(compressedChunk)});
    }

    return chunks;
}

readRegion(readFileSync("regionTest.dat"));