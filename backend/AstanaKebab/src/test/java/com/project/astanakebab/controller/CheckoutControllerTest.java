package com.project.astanakebab.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.astanakebab.dto.PaymentInfo;
import com.project.astanakebab.dto.Purchase;
import com.project.astanakebab.dto.PurchaseResponse;
import com.project.astanakebab.entity.Customer;
import com.project.astanakebab.entity.Order;
import com.project.astanakebab.entity.OrderItem;
import com.project.astanakebab.service.CheckoutService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@ExtendWith(MockitoExtension.class)
public class CheckoutControllerTest {

    @Mock
    private CheckoutService checkoutService;

    @InjectMocks
    private CheckoutController checkoutController;

    private MockMvc mockMvc;
    private Purchase purchase;

    private ObjectMapper objectMapper = new ObjectMapper();


    @BeforeEach
    void setUp(){
        mockMvc = MockMvcBuilders.standaloneSetup(checkoutController).build();
    }

    @Test
    void placeOrderTest() throws Exception {
        purchase = new Purchase();
        Customer customer = new Customer();
        customer.setEmail("test@example.com");
        purchase.setCustomer(customer);

        Order order = new Order();
        purchase.setOrder(order);

        Set<OrderItem> orderItems = new HashSet<>();
        OrderItem orderItem = new OrderItem();
        orderItem.setQuantity(1);
        orderItem.setUnitPrice(BigDecimal.TEN);
        orderItems.add(orderItem);
        purchase.setOrderItems(orderItems);

        objectMapper = new ObjectMapper();

        PurchaseResponse response = new PurchaseResponse("testTrackingNumber");

        when(checkoutService.placeOrder(any(Purchase.class))).thenReturn(response);

        mockMvc.perform(post("/api/checkout/purchase")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(purchase)))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.orderTrackingNumber").value("testTrackingNumber"));
    }

    @Test
    void createPaymentIntentTest() throws Exception {
        PaymentInfo paymentInfo = new PaymentInfo();
        paymentInfo.setAmount(1000);
        paymentInfo.setCurrency("usd");
        paymentInfo.setReceiptEmail("test@example.com");

        PaymentIntent mockPaymentIntent = new PaymentIntent();
        mockPaymentIntent.setId("pi_123");
        mockPaymentIntent.setAmount(1000L);
        mockPaymentIntent.setCurrency("usd");

        when(checkoutService.createPaymentIntent(any(PaymentInfo.class))).thenReturn(mockPaymentIntent);

        mockMvc.perform(post("/api/checkout/payment-intent")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(paymentInfo)))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value("pi_123"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.amount").value(1000));

    }
}
