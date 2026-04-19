(function(){

    /* =============================
       UTILIDADES
    ============================= */
    const $ = (s) => document.querySelector(s);
    const $$ = (s) => document.querySelectorAll(s);

    /* =============================
       ELEMENTOS REALES (TU HTML)
    ============================= */

// botón agregar comunero
    const btnToggleAdd = $('.card__managetop--btn');

// sección formulario
    const addSection = $('#add-section');

// form
    const formAdd = $('#form-add');

// botones form
    const btnCancelAdd = $('#btn-cancel-add');
    const btnAddCargo = $('#btn-add-cargo');

// password
    const togglePasswordBtn = $('#toggle-password');
    const passwordInput = $('#password');

// foto
    const profilePhoto = $('#profile-photo');
    const photoFilename = $('#photo-filename');

// lista comuneros
    const commList = $('.card__list');

// búsqueda
    const searchInput = $('#search-comuneros');

    /* =============================
       TOGGLE FORMULARIO
    ============================= */
    btnToggleAdd?.addEventListener('click', () => {
        const isOpen = addSection.classList.toggle('card--open');
        addSection.setAttribute('aria-hidden', (!isOpen).toString());

        if(isOpen){
            addSection.scrollIntoView({behavior: 'smooth'});
        }
    });

    /* =============================
       CANCELAR FORM
    ============================= */
    btnCancelAdd?.addEventListener('click', () => {
        formAdd.reset();
        photoFilename.textContent = 'Ningún archivo seleccionado';
        addSection.classList.remove('card--open');
    });

    /* =============================
       TOGGLE PASSWORD
    ============================= */
    togglePasswordBtn?.addEventListener('click', () => {
        const isPwd = passwordInput.type === 'password';
        passwordInput.type = isPwd ? 'text' : 'password';
        togglePasswordBtn.textContent = isPwd ? 'Ocultar' : 'Mostrar';
    });

    /* =============================
       FOTO
    ============================= */
    profilePhoto?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        photoFilename.textContent = file ? file.name : 'Ningún archivo seleccionado';
    });

    /* =============================
       ACCIONES DE COMUNEROS
    ============================= */
    commList?.addEventListener('click', (e) => {

        const btn = e.target.closest('.card__btn');
        if(!btn) return;

        const action = btn.dataset.action;
        const item = btn.closest('.card__item');

        if(!item) return;

        const desc = item.querySelector('.card__description');

        if(action === 'activate'){
            desc.textContent = 'Activo • Actualizado';
            alert('Comunero activado');
        }

        if(action === 'deactivate'){
            desc.textContent = 'Inactivo';
            alert('Comunero inactivo');
        }

        if(action === 'edit'){
            alert('Editar comunero (simulado)');
        }

        if(action === 'remove'){
            item.remove();
            alert('Comunero eliminado');
        }
    });

    /* =============================
       GUARDAR COMUNERO
    ============================= */
    formAdd?.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = $('#full-name').value.trim();
        const birth = $('#birthdate').value;

        if(!name || !birth){
            alert('Completa los campos obligatorios');
            return;
        }

        const newItem = document.createElement('div');
        newItem.className = 'card__item';

        newItem.innerHTML = `
        <div class="card__avatar">
            <i class="card__icon fa-solid fa-user"></i>
        </div>
        <div class="card__info">
            <div class="card__name">${name}</div>
            <div class="card__description">Nuevo • ${birth}</div>
        </div>
        <div class="card__actions">
            <button class="card__btn card__btn--success" data-action="activate">Activar</button>
            <button class="card__btn card__btn--warning" data-action="deactivate">Desactivar</button>
            <button class="card__btn card__btn--edit" data-action="edit">Editar</button>
            <button class="card__btn card__btn--danger" data-action="remove">Dar de baja</button>
        </div>
    `;s

        commList.prepend(newItem);

        alert('Comunero agregado');

        formAdd.reset();
        addSection.classList.remove('card--open');
    });

    /* =============================
       BUSCADOR
    ============================= */
    searchInput?.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase();

        $$('.card__item').forEach(item => {
            const name = item.querySelector('.card__name').textContent.toLowerCase();
            item.style.display = name.includes(value) ? '' : 'none';
        });
    });

})();