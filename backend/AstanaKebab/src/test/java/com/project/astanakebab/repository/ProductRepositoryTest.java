package com.project.astanakebab.repository;

import com.project.astanakebab.entity.Product;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ProductRepositoryTest {
    @Mock
    private ProductRepository productRepository;

    @Mock
    private Pageable pageable;

    @Test
    void findByCategoryId(){
        Page<Product> productPage = new PageImpl<>(List.of(new Product()));

        when(productRepository.findByCategoryId(1L, pageable)).thenReturn(productPage);

        Page<Product> result = productRepository.findByCategoryId(1L, pageable);

        assertNotNull(result);
        assertEquals(1, result.getContent().size());
    }

    @Test
    void findByNameContainingIgnoreCase(){
        Page<Product> productPage = new PageImpl<>(List.of(new Product()));

        when(productRepository.findByNameContainingIgnoreCase("astana", pageable)).thenReturn(productPage);

        Page<Product> result = productRepository.findByNameContainingIgnoreCase("astana", pageable);

        assertNotNull(result);
        assertEquals(1, result.getContent().size());

    }
}
