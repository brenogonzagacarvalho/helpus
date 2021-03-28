var Moviedb = require('../model/model');

// Criando e salvando as series e filmes
exports.create = (req, res) => {
    // validadando a request
    if (!req.body) {
        res.status(400).send({
            message: "Conferira os campos do formulario!!"
        });
        return;
    }

    // add novo filme/serie
    const movie = new Moviedb({
        name: req.body.name,
        time: req.body.time,
        gender: req.body.gender,
        status: req.body.status
    })

    // salvando no banco filme/serie
    movie
        .save(movie)
        .then(data => {
            //res.send(data)
            res.redirect('/add-movie');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Erro ao enviar os dados para o banco"
            });
        });

}

// listar todos os filmes/series
exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        Moviedb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: "Filme/Serie nao encontrados " + id
                    })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Erro ao encontrar o item pedido " + id
                })
            })

    } else {
        Moviedb.find()
            .then(movie => {
                res.send(movie)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Erro ao retonar as informaçoes da lista de filmes"
                })
            })
    }

}

// Editando filme/serie da lista
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({
                message: "Campo nao pode ser editado como vazio"
            })
    }

    const id = req.params.id;
    Moviedb.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Nao foi possivel editar ${id}.Filme/serie nao encontrado`
                })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao atualilzar informação!"
            })
        })
}

// Deletar filmes/series da lista
exports.delete = (req, res) => {
    const id = req.params.id;

    Moviedb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Nao foi possivel deletar ${id}. filme/serie nao encontrado`
                })
            } else {
                res.send({
                    message: "Filme/Serie Deletado com sucesso!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Nao foi possivel deletar o filme id=" + id
            });
        });
}