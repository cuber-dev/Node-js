const result = document.querySelector('.container')
        
        
        const submit = document.querySelector('#submit')
        const handleSubmit = async (e) => {
            e.preventDefault()
            const nameValue = document.querySelector('#name').value;
            console.log(nameValue)
            const response = await fetch('/api/people',{ 
                "method" : "POST" ,
                "headers" : {
                    "Content-Type" : "application/json" ,
                },
                "body" : JSON.stringify({
                    "name" : nameValue
                })
            })
            const data = await response.json()
            console.log(data)
            if(data.name){
                result.innerHTML = `
                <br/>
                            <div class="alert alert-primary" >Hai ${data.name} </div>
                `
            }else{
                result.innerHTML = `
                <br/>
                            <div class="alert alert-danger" >${data.message}</div>
                `
            }
        }
        submit.addEventListener('click',handleSubmit)