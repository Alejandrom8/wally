class Form{
    /**
     * 
     * @param {Object} form - the HTML form element
     * @param {HTMLElement} errorSection - the section where will be displayed the errors
     * @param {function} callbackOnSuccess - the function that will be executed when the petition finishes 
     */
    constructor(form, errorSection, callbackOnSuccess = null){
        this.form = form;
        this.errorSection = errorSection;
        this.callbackOnSuccess = callbackOnSuccess;
        // this.callbackOnSuccess = this.callbackOnSuccess.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toJSONString = this.toJSONString.bind(this);
        this.form.addEventListener('submit', this.handleSubmit);
    }

    presentError(err){
        this.errorSection.innerHTML = `<p>${err}</p>`;
    }

    toJSONString(form) {
		let obj = {};
        let elements = this.form.querySelectorAll( "input, select, textarea" );

        elements.forEach(element => {
            let name = element.name;
            let value = element.value;
            if(name) obj[name] = value;
        });

		return JSON.stringify( obj );
    }
    
    async sendValues(values){
        try{
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            const credentials = {
                method: this.form.method,
                headers: headers,
                cache: 'default',
                body: values
            };
            const result = await fetch(this.form.action, credentials);

            if(result.ok){
                return await result.json();
            }else{
                throw new Error('No se ha podido conectar correctamente con el servidor');
            }

        }catch(error){
            console.log(error);
        }

        return null;
    }

    manageResponse(res){
        if(res.success){
            if(this.callbackOnSuccess){
                this.callbackOnSuccess(res);
            }else{
                console.log(res);
            }
        }else{
            this.presentError(res.errors);
        }
    }

    async handleSubmit(e){
        e.preventDefault();
        const values = this.toJSONString();
        const result = await this.sendValues(values);
        this.manageResponse(result);
    }
}