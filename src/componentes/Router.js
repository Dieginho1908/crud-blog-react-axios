import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import axios from 'axios'

import Swal from 'sweetalert2'

//componentes
import Header from './Header'
import Navegacion from './Navegacion'
import Posts from './Posts'
import SinglePost from './SinglePost'
import Formulario from './Formulario'
import Editar from './Editar'

class Router extends Component {

    state ={
        posts: []
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.obtenerPost();
    }

    obtenerPost =  () =>{
        
        axios.get(`https://jsonplaceholder.typicode.com/posts`)
        .then( res =>{
            this.setState({
                posts: res.data
            })
        })
        .catch(err=>{
            console.log(err)
        })

        
    }

    borrarPost = (id) =>{

        axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(res => {
            if(res.status === 200){
                const posts = [...this.state.posts];
                
                let resultado = posts.filter(post => (
                    post.id != id
                ));

                //console.log(resultado)
                this.setState({
                    posts:resultado
                })

            }
        })
    }

    crearPost = (post) => {
        //console.log(post)

        axios.post(`https://jsonplaceholder.typicode.com/posts`, {post})
        .then(res =>{
            if(res.status === 201){
                Swal.fire(
                    'Correcto!',
                    'Se ha creado un nuevo Post!',
                    'success'
                  )
                let postId = {id: res.data.id}
                const nuevoPost = Object.assign({}, res.data.post, postId)

                //console.log(nuevoPost)

                this.setState(prevState => ({
                    posts: [...prevState.posts, nuevoPost]
                }))
            }
        })
    }

    editarPost = (post) => {
        //console.log(post)

        axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {post})
        .then(res =>{
            if(res.status === 200){
                Swal.fire(
                    'Correcto!',
                    'Se ha editado Post!',
                    'success'
                  )
                
                  let postId = res.data.id;
                  const posts = [...this.state.posts];

                  const postEditar = posts.findIndex(post => (
                      postId === post.id
                  ))

                  posts[postEditar] = post;

                  this.setState({
                      posts
                  })

            }
        })
    }
    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <div className="row justify-content-center">
                        <Header
                        />
                        <Navegacion
                        />
                        <Switch>
                            <Route exact path="/" render ={() => {
                                return (
                                    <Posts 
                                    posts={this.state.posts}
                                    borrarPost={this.borrarPost}
                                    />
                                )
                            }}
                            
                            />

                            <Route exact path="/post/:postId" render={ (props) => {
                                let idPost = props.location.pathname.replace('/post/', '')
                                const posts = this.state.posts;

                                let filtro;
                                filtro = posts.filter(post => 
                                (post.id == idPost
                                ))

                                return(
                                    <SinglePost
                                        post={filtro[0]}
                                    />  
                                )
                                }}
                                />


                                //Editar
                                <Route exact path="/editar/:postId" render={ (props) => {
                                let idPost = props.location.pathname.replace('/editar/', '')
                                const posts = this.state.posts;

                                let filtro;
                                filtro = posts.filter(post => 
                                (post.id == idPost
                                ))

                                return(
                                    <Editar
                                        post={filtro[0]}
                                        editarPost={this.editarPost}
                                    />  
                                )
                                }}
                                />

                                <Route exact path="/crear" render ={() => {
                                return (
                                    <Formulario 
                                    crearPost={this.crearPost}
                                    />
                                )
                            }}/>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default Router;