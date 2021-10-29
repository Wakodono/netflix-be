import fs from "fs-extra" // fs-extra gives us same methods of fs (plus some extras) and gives us PROMISES!
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const { readJSON, writeJSON } = fs // readJSON and writeJSON are not part of the "normal" fs module

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")

export const mediaJSONPath = join(dataFolderPath, "media.json")

export const getMedia = readJSON(mediaJSONPath)
export const writeMedia = content => writeJSON(mediaJSONPath, content)