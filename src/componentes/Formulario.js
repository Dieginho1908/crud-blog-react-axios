import React, { Component } from 'react';

class Formulario extends Component {

    //crear Refs

    tituloRef = React.createRef();
    entradaRef = React.createRef();


    crearPost = (e) => {
        e.preventDefault();
        //leer los refs

        const post = {
            title: this.tituloRef.current.value,
            body: this.entradaRef.current.value,
            userId: 1
        }

        this.props.crearPost(post)

        //enviar los props o petición de axios
    }

    render() {
        return (
            <form className="col-8" onSubmit={this.crearPost}>
                <legend className="text-center">Crear nuevo Post</legend>
                <div className="form-group">
                    <label htmlFor="">Título del Post</label>
                    <input type="text" ref={this.tituloRef} className="form-control" placeholder="Título del post"/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Contenido</label>
                    <textarea ref={this.entradaRef} name="" id="" cols="30" rows="10" className="form-control" placeholder="Contenido"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Crear</button>
            </form>
        );
    }
}

export default Formulario;