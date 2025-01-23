import * as fs from "fs/promises";
import path from "path";
import url from "url";

class DataManager {
  #__filename = url.fileURLToPath(import.meta.url);
  #__dirname = path.dirname(this.#__filename);
  #pathData = path.resolve(this.#__dirname, "../../data/dados.json");
  #pathFat = path.resolve(this.#__dirname, "../../data/fat.json");


  readDadosFromFile = async () => {

    try {
      const data = await fs.readFile(this.#pathData, "utf8");
      const parsedData = JSON.parse(data);

      if (Array.isArray(parsedData)) {
        return parsedData;
      } else {
        return [];
      }
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  readFatFromFile = async () => {
    try {
      const data = await fs.readFile(this.#pathFat, "utf8");
      const parsedData = JSON.parse(data);

      if (typeof parsedData === "object" && !Array.isArray(parsedData) && parsedData !== null) {
        return parsedData;
      } else {
        console.error("Os dados no arquivo não estão no formato esperado.");
        return {};
      }
    } catch (err) {
      console.error("Erro ao ler o arquivo:", err.message);
      return {};
    }
  };


}
export default DataManager;