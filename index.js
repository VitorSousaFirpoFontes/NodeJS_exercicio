const express = require("express");
require("dotenv").config();
const produtos = require("./db");
const app = express();
app.use(express.json());

//imprimir todos produtos
app.get('/produtos', (req, res) => {
  res.json(produtos);
});

//imprimir produtos com base no id enviado 
app.get('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const produto = produtos.find(p => p.id === parseInt(id));

  if (produto) {
    res.json(produto);
  } else {
    res.status(404).json({ mensagem: 'Produto não encontrado!' });
  }
});

//inserir um novo produto
app.post('/produtos', (req, res) => {
  const { id, nome, quantidade, preco } = req.body;

  
  const produtoExistente = produtos.find(p => p.id === id);

  if (produtoExistente) {
    return res.status(400).json({ mensagem: 'Produto com esse ID já existe!' });
  }

  produtos.push({ id, nome, quantidade, preco });
  res.status(201).json({ mensagem: 'Produto criado com sucesso!', produto: { id, nome, quantidade, preco } });
});

//alterar
app.put('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, quantidade, preco } = req.body;

  const index = produtos.findIndex(p => p.id === parseInt(id));

  if (index !== -1) {
    produtos[index] = { id: parseInt(id), nome, quantidade, preco };
    res.json({ mensagem: 'Produto atualizado com sucesso!', produto: produtos[index] });
  } else {
    res.status(404).json({ mensagem: 'Produto não encontrado!' });
  }
});
//deletar
app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const index = produtos.findIndex(p => p.id === parseInt(id));

  if (index !== -1) {
    produtos.splice(index, 1);
    res.json({ mensagem: 'Produto deletado com sucesso!' });
  } else {
    res.status(404).json({ mensagem: 'Produto não encontrado!' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
