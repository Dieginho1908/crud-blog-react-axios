import React, { Component } from 'react';

class Editar extends Component {

    //crear Refs

    tituloRef = React.createRef();
    entradaRef = React.createRef();
    
    cargarFormulario = () => {
        if(!this.props.post) return null
        const {title, body} = this.props.post
        return (
            <form className="col-8" onSubmit={this.editarPost}>
                <legend className="text-center">Editar</legend>
                <div className="form-group">
                    <label htmlFor="">Título del Post</label>
                    <input type="text" ref={this.tituloRef} className="form-control" defaultValue={title} placeholder="Título del post"/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Contenido</label>
                    <textarea ref={this.entradaRef} name="" id="" cols="30" rows="10" className="form-control" defaultValue={body}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Guardar cambios</button>
            </form>
        )
    }


    editarPost = (e) => {
        e.preventDefault();

        const post = {
            title: this.tituloRef.current.value,
            body: this.entradaRef.current.value,
            userId: 1,
            id: this.props.post.id
        }
        console.log(post)
        this.props.editarPost(post)

    }
    render() {

        

        
        return (
            <React.Fragment>
                {this.cargarFormulario()}
            </React.Fragment>
        );
    }
}

export default Editar;