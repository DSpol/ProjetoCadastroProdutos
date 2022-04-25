window.addEventListener('load',() =>{
    const form = document.querySelector('#new-product-form');
    const input = document.querySelector('#new-product-input');
    const list_el = document.querySelector('#products');
    
    getProducts();
    let oldValue;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
       
        const product = input.value;

        const product_el = document.createElement('div');
		product_el.classList.add('product');

		const product_content_el = document.createElement('div');
		product_content_el.classList.add('content');

		product_el.appendChild(product_content_el);

        const product_input_el = document.createElement('input');
        product_input_el.classList.add('text');
        product_input_el.type = 'text';
        product_input_el.value = product;
        product_input_el.setAttribute('readonly', 'readonly');

        product_content_el.appendChild(product_input_el);

        const product_actions_el = document.createElement('div');
        product_actions_el.classList.add('actions');

        const product_edit_el = document.createElement('button');
        product_edit_el.classList.add('edit');
        product_edit_el.innerText = 'Editar';

        const product_delete_el = document.createElement('button');
        product_delete_el.classList.add('delete');
        product_delete_el.innerText = 'Deletar';

        product_actions_el.appendChild(product_edit_el);
        product_actions_el.appendChild(product_delete_el);

        product_el.appendChild(product_actions_el);

        list_el.appendChild(product_el);

        saveProduct(product_input_el.value);
        input.value = '';

        product_edit_el.addEventListener('click', (e) => {
            if (product_edit_el.innerText.toLowerCase() == "editar") {
                product_edit_el.innerText = "Salvar";
                oldValue = product_input_el.value;
                product_input_el.removeAttribute("readonly");
                product_input_el.focus();
            } else {
                product_edit_el.innerText = "Editar";
                product_input_el.setAttribute("readonly", "readonly");
                updateProduct(oldValue, product_input_el.value);
            }
        });

        product_delete_el.addEventListener('click', (e) => {
            deleteProduct(product_input_el.value);
            list_el.removeChild(product_el);
        });
    });

    function loadProducts(product) {

        const product_el = document.createElement('div');
		product_el.classList.add('product');

		const product_content_el = document.createElement('div');
		product_content_el.classList.add('content');

		product_el.appendChild(product_content_el);

        const product_input_el = document.createElement('input');
        product_input_el.classList.add('text');
        product_input_el.type = 'text';
        product_input_el.value = product;
        product_input_el.setAttribute('readonly', 'readonly');

        product_content_el.appendChild(product_input_el);

        const product_actions_el = document.createElement('div');
        product_actions_el.classList.add('actions');

        const product_edit_el = document.createElement('button');
        product_edit_el.classList.add('edit');
        product_edit_el.innerText = 'Editar';

        const product_delete_el = document.createElement('button');
        product_delete_el.classList.add('delete');
        product_delete_el.innerText = 'Deletar';

        product_actions_el.appendChild(product_edit_el);
        product_actions_el.appendChild(product_delete_el);

        product_el.appendChild(product_actions_el);

        list_el.appendChild(product_el);

        product_edit_el.addEventListener('click', (e) => {
            if (product_edit_el.innerText.toLowerCase() == "editar") {
                product_edit_el.innerText = "Salvar";
                oldValue = product_input_el.value;
                product_input_el.removeAttribute("readonly");
                product_input_el.focus();
            } else {
                product_edit_el.innerText = "Editar";
                product_input_el.setAttribute("readonly", "readonly");
                updateProduct(oldValue, product_input_el.value);
            }
        });

        product_delete_el.addEventListener('click', (e) => {
            deleteProduct(product_input_el.value);
            list_el.removeChild(product_el);
        });
    }

    function getProducts(){
        let url = 'http://127.0.0.1:8080';
        fetch(url + "/products")
        .then((response)=> response.json())
        .then(function(result){ 
            let products = result
            products.forEach((p)=> {
                loadProducts(p.name);
            })
        })
    }

    function saveProduct(name) {
        let url = 'http://127.0.0.1:8080';
        const options = {
            method: 'POST' ,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            } ,
            body: JSON.stringify({
                name: name
            })
        }
        return fetch(url + "/products", options).then(response => response.json());
    }

    function deleteProduct(name) {
        let url = 'http://127.0.0.1:8080';
        const options = {
            method : 'DELETE'
        }
        return fetch(url + "/products/" + name , options).then(response => response.json());
    }

    function updateProduct(oldName, newName) {
        let url = 'http://127.0.0.1:8080';
        const options = {
            method: 'PUT' ,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            } ,
            body: JSON.stringify({
                name: newName
            })
        }
        return fetch(url + "/products/" + oldName , options).then(response => response.json());
    }
});