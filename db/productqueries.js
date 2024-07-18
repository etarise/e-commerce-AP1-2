const config = require('../config');
const Pool = require('pg').Pool
const pool = new Pool(config);
const getProducts = (request, response) => {

  pool.query('SELECT * FROM product ORDER BY productid ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getProductById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM product WHERE productid = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createProduct = (request, response) => {
  const { name,price,description } = request.body

  pool.query('INSERT INTO product (name,price,description) VALUES ($1, $2, $3) RETURNING *', [name,price,description], (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).send(result.rows[0])
  })
}

const updateProduct = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, price, description } = request.body

  pool.query(
    'UPDATE product SET name = $1, price = $2 , description = $3 WHERE productid = $4',
    [name, price, description,id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Product modified with ID: ${id}`)
    }
  )
}

const deleteProduct = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM products WHERE productid = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Product deleted with ID: ${id}`)
  })
}


module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}
