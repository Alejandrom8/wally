class List{
    constructor(list = {}){
        this.list = list;
    }

    getKeys(){
        return Object.keys(this.list);
    }

    addElement(element){
        if(typeof element == 'object' && element.id){
            this.list[element.id] = element;
        }else{
            console.log(`Invalid element ${element}`);
        }
    }

    remove(element){
        if(!element.id || !this.list[element.id]){
            console.log('El elemento no existe!');
            return
        }
        delete this.list[element.id];
    }

    removeById(id){
        if(this.list[id]){
            delete this.list[id];
        }else{
            console.log(`El elemento ${id} no existe`);
        }
    }

    searchByKey(key){
        const keys = this.getKeys();
        let element;
        for(let index = 0; index < keys.length; index++){
            if(this.list[keys[index]] == key){
                element = this.list[keys[index]];
                break;
            }
        }
        return element;
    }

    searchByValue(value){
        const keys = this.getKeys();
        let element;

        for(let index = 0; index < keys.length; index++){
            let element = this.list[keys[index]];
            let props = Object.keys(element);
            for(let eindex = 0; eindex < props.length; eindex++){
                if(element[props[eindex]] == value){
                    element = this.list[keys[index]];
                    break;
                }
            }
        }

        return element;
    }

    update(element){
        if(!element.id || !this.list[element.id]){
            console.log('No se ha ingresado un elemento no existente');
            return false;
        }
        this.list[element.id] = element;
        return true;
    }

    see(){
        console.log(this.list);
    }
}

// const prueba = new List({
//     '1':{id:'1', name: 'alex'},
//     '2':{id:'2', name: 'yo'},
//     '3':{id:'3', name: 'otro'}
// });

// prueba.addElement({id: '4', name: 'adios'});
// prueba.deleteElement(prueba.list['1']);
// prueba.deleteElementById('2');
// console.log(prueba.searchByKey('3'));
// console.log(prueba.searchByValue('alex'));
// prueba.update({id: '4', name:'hola'});
// prueba.see();

module.exports = List;