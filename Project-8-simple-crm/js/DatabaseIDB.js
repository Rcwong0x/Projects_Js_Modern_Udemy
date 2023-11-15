class DatabaseIDB {
    #db
    #dbName
    #version
    constructor(dbName = "dbName", version = 1) {
        this.#dbName = dbName;
        this.#version = version;

        const requestDB = window.indexedDB.open(this.#dbName, this.#version);
        
        requestDB.onerror = function (e) {
            console.log("IndexDB no es compatible en este navegador");
        };
        requestDB.onsuccess = (e) => {
            console.log("La conexion a la BD fue abierta");
            this.db = (e.target.result);
        };

        requestDB.onupgradeneeded = function (e) {
            const IDB = e.target.result;

            const objectStore = IDB.createObjectStore("crm", {
                keyPath: "id",
                autoIncrement: true,
            });

            objectStore.createIndex("name", "name", { unique: false });
            objectStore.createIndex("email", "email", { unique: false });
            objectStore.createIndex("tel", "tel", { unique: false });
            objectStore.createIndex("company", "company", { unique: false });
            objectStore.createIndex("id", "id", { unique: true });
        };
    }

    set db(db){
        this.#db = db;
    }
    get db() {
        return this.#db;
    }

    createRecord(dataObject){
        const transaction = this.db.transaction([this.#dbName], "readwrite");
        const objectStore = transaction.objectStore(this.#dbName);

        const requestCreate = objectStore.add(dataObject);
        let requestResult;

        requestCreate.onsuccess = function () {
            requestResult = ["Registro guardado", "success"];
        }
        requestCreate.onerror = function () {
            requestResult = ["Ocurrio un error al guardar el registro!", "error"];
        }

        return requestResult;
    }


}

export default DatabaseIDB;
