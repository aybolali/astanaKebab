package com.project.astanakebab.service;

import com.project.astanakebab.dto.PaymentInfo;
import com.project.astanakebab.dto.Purchase;
import com.project.astanakebab.dto.PurchaseResponse;
import com.project.astanakebab.entity.*;
import com.project.astanakebab.repository.CustomerRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CheckoutServiceImplTest {

    @Mock
    private CustomerRepository customerRepository;

    @InjectMocks
    private CheckoutServiceImpl checkoutService;

    private Purchase purchase;
    private Customer customer;
    private Order order;
    private Set<OrderItem> orderItems;

    @BeforeEach
    void setUp() {

        customer = new Customer();
        customer.setEmail("ai@gmail.com");

        order = new Order();

        orderItems = new HashSet<>();
        OrderItem orderItem1 = new OrderItem();
        orderItem1.setQuantity(1);
        orderItem1.setUnitPrice(BigDecimal.TEN);
        orderItems.add(orderItem1);



        purchase = new Purchase();
        purchase.setCustomer(customer);
        purchase.setOrder(order);
        purchase.setOrderItems(orderItems);

        Stripe.apiKey = "sk_test_51QuCDdB1p8lpI7C76roMiLW9Anm0Lf8cylZ4mk9bAeVcY4BTa0dpu9AIzHXIY0yoEKIRP3wamm5XuoYarcOfPPyM001QWM13hl";

    }

    @Test
    void placeOrder_newCustomer_savesAndReturnsResponse() {

        when(customerRepository.findByEmail(customer.getEmail())).thenReturn(null);

        when(customerRepository.save(any(Customer.class))).thenReturn(customer);

        PurchaseResponse response = checkoutService.placeOrder(purchase);

        assertNotNull(response.getOrderTrackingNumber());
        assertFalse(response.getOrderTrackingNumber().isEmpty());
        verify(customerRepository, times(1)).save(any(Customer.class));
    }

    @Test
    void placeOrder_existingCustomer_updatesAndReturnsResponse() {

        Customer existingCustomer = new Customer();
        existingCustomer.setId(1L);
        existingCustomer.setEmail(customer.getEmail());

        when(customerRepository.findByEmail(customer.getEmail())).thenReturn(existingCustomer);
        when(customerRepository.save(any(Customer.class))).thenReturn(existingCustomer);

        PurchaseResponse response = checkoutService.placeOrder(purchase);

        assertNotNull(response.getOrderTrackingNumber());
        assertFalse(response.getOrderTrackingNumber().isEmpty());
        verify(customerRepository, times(1)).save(any(Customer.class));
    }

    @Test
    void createPaymentIntent() throws StripeException {
        PaymentInfo paymentInfo = new PaymentInfo();
        paymentInfo.setAmount(1000);
        paymentInfo.setCurrency("pln");
        paymentInfo.setReceiptEmail("ai@gmail.com");

        PaymentIntent mockPaymentIntent = mock(PaymentIntent.class);

        try (MockedStatic<PaymentIntent> mockedStatic = mockStatic(PaymentIntent.class)) {
            mockedStatic.when(() -> PaymentIntent.create(anyMap()))
                    .thenReturn(mockPaymentIntent);
        }

        PaymentIntent result = checkoutService.createPaymentIntent(paymentInfo);

        assertNotNull(result);
    }


}