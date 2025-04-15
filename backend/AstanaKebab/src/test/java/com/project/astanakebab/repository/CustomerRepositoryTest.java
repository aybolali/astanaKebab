package com.project.astanakebab.repository;

import com.project.astanakebab.entity.Customer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class CustomerRepositoryTest {

    @Mock
    private CustomerRepository customerRepository;

    @Test
    void findByEmailTest(){
        Customer customer = new Customer();
        customer.setEmail("asar@gmail.com");

        when(customerRepository.findByEmail("asar@gmail.com")).thenReturn(customer);

        Customer result = customerRepository.findByEmail("asar@gmail.com");

        assertNotNull(result);
        assertEquals("asar@gmail.com", result.getEmail());
    }
}
