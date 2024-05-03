import { useState } from 'react';
import './App.css';

import BaseColaboradores from './database/data';
import { RegisterForm } from './components/Formulario';
import { TableUsers } from './components/Listado';
import { Search } from './components/Buscador';
import { AlertRegisterForm } from './components/Alert';

function App() {
    const [data, setData] = useState(BaseColaboradores);
    const [filteredData, setFilteredData] = useState([]);

    const [form, setForm] = useState({
        id: '',
        nombre: '',
        correo: '',
        edad: '',
        cargo: '',
        telefono: '',
    });

    const [formState, setFormState] = useState({
        success: '',
        error: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const id = data.length + 1;
        const { nombre, correo, edad, cargo, telefono } = event.target;

        if (
            !nombre.value ||
            !correo.value ||
            !edad.value ||
            !cargo.value ||
            !telefono.value
        ) {
            setFormState({ error: 'Todos los campos son requeridos', success: '' });
        } else {
            const formData = {
                id,
                nombre: nombre.value,
                correo: correo.value,
                edad: edad.value,
                cargo: cargo.value,
                telefono: telefono.value,
            };

            handleAddUser(formData);
            setFormState({ success: 'Usuario agregado correctamente', error: '' });
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleAddUser = (newUser) => {
        setData([...data, newUser]);
    };

    const handleDelete = (id) => {
        setData(data.filter((user) => user.id != id));
    };

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();

        setFilteredData(
            data.filter((user) =>
                Object.values(user).some((userField) =>
                    userField.toLowerCase().includes(value)
                )
            )
        );
    };

    return (
        <>
            <h1>Agregar un colaborador</h1>

            <AlertRegisterForm message={formState.success || formState.error} /> {}
            <RegisterForm
                onSubmit={handleSubmit}
                onChange={handleChange}
            />
            <Search onChange={handleSearch} />
            <TableUsers
                users={data}
                onDelete={handleDelete}
                filteredData={filteredData}
            />
        </>
    );
}

export default App;

