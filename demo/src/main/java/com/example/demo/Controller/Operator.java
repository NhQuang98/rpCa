package com.example.demo.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class Operator {

    @PostMapping("/add/{a}/{b}")
    public ResponseEntity<?> addOperator(@PathVariable double a,@PathVariable double b){
        return ResponseEntity.ok().body(a+b);
    }
    @PostMapping("/sub/{a}/{b}")
    public ResponseEntity<?> subOperator(@PathVariable double a,@PathVariable double b){
        return ResponseEntity.ok().body(a-b);
    }
    @PostMapping("/multi/{a}/{b}")
    public ResponseEntity<?> mulOperator(@PathVariable double a,@PathVariable double b){
        return ResponseEntity.ok().body(a*b);
    }
    @PostMapping("/devide/{a}/{b}")
    public ResponseEntity<?> devideOperator(@PathVariable double a,@PathVariable double b){
        return ResponseEntity.ok().body(a/b);
    }
}
