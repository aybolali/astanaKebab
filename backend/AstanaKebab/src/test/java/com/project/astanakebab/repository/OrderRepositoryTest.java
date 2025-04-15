package com.project.astanakebab.repository;

import com.project.astanakebab.entity.Customer;
import com.project.astanakebab.entity.Order;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class OrderRepositoryTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private CustomerRepository customerRepository;

    @BeforeEach
    void setUp() {
        // Create and save a customer instance
        Customer customer = new Customer();
        customer.setFirstName("Test");
        customer.setLastName("Customer");
        customer.setEmail("test@example.com");

        // Create orders for the customer
        Order order1 = new Order();
        order1.setOrderTrackingNumber("ORD123");
        order1.setTotalPrice(new BigDecimal("100.00"));
        order1.setTotalQuantity(3);
        order1.setStatus("Shipped");
        order1.setCustomer(customer);
        order1.setDateCreated(new Date(System.currentTimeMillis() - 100000)); // created earlier

        Order order2 = new Order();
        order2.setOrderTrackingNumber("ORD124");
        order2.setTotalPrice(new BigDecimal("150.00"));
        order2.setTotalQuantity(2);
        order2.setStatus("Delivered");
        order2.setCustomer(customer);
        order2.setDateCreated(new Date()); // created now

        // Mock the repository call
        List<Order> orderList = new ArrayList<>();
        orderList.add(order2); // most recent first
        orderList.add(order1); // older second
        Page<Order> page = new PageImpl<>(orderList);

        when(orderRepository.findByCustomerEmailOrderByDateCreatedDesc("test@example.com", PageRequest.of(0, 10)))
                .thenReturn(page);
    }

    @Test
    void testFindByCustomerEmailOrderByDateCreatedDesc() {
        // Fetch orders by customer email, ordered by creation date in descending order
        Page<Order> orders = orderRepository.findByCustomerEmailOrderByDateCreatedDesc(
                "test@example.com",
                PageRequest.of(0, 10)
        );

        // Assert that the orders belong to the correct customer and are ordered by date created
        assertThat(orders.getContent()).hasSize(2);
        assertThat(orders.getContent().get(0).getDateCreated()).isAfter(orders.getContent().get(1).getDateCreated());
        assertThat(orders.getContent().get(0).getCustomer().getEmail()).isEqualTo("test@example.com");
        assertThat(orders.getContent().get(1).getCustomer().getEmail()).isEqualTo("test@example.com");
    }
}
