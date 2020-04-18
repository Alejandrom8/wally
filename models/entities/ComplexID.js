class ComplexID{
    constructor(complexID){
        this.complexID = complexID;
        this.roomID = complexID.slice(0, id_size[0]);
        this.playerID = complexID.slice(id_size[0], id_size[0] + id_size[1]);
    }
}

module.exports = ComplexID;