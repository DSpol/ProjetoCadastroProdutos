package com.spol.mercado.controller;

import com.spol.mercado.entity.Product;
import com.spol.mercado.repository.ProductRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/products"})
public class ProductController {
    private ProductRepository repository;

    ProductController(ProductRepository productRepository) {
        this.repository = productRepository;
    }

    @GetMapping
    public List findAll(){
        return repository.findAll();
    }

    @GetMapping({"/{id}"})
    public ResponseEntity<Product> findById(@PathVariable long id){
        return repository.findById(id)
                .map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Product create(@RequestBody Product product){

        if (product.getName().equals("") || product.getName() == null){
            return
        }
        return repository.save(product);
    }

    @PutMapping(value="/{name}")
        public ResponseEntity<Product> update(@PathVariable("name") String name,
                                              @RequestBody Product product){
        return repository.findByName(name)
                .map(record -> {
                    record.setName(product.getName());
                    record.setAmount(product.getAmount());
                    record.setExpirationDate(product.getExpirationDate());
                    record.setValue(product.getValue());
                    Product updated = repository.save(record);
                    return ResponseEntity.ok().body(updated);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping(path ={"/{name}"})
        public ResponseEntity<?> delete(@PathVariable("name") String name) {
            return repository.findByName(name)
                    .map(record -> {
                        repository.deleteById(record.getId());
                        return ResponseEntity.ok().build();
                    }).orElse(ResponseEntity.notFound().build());
    }
}