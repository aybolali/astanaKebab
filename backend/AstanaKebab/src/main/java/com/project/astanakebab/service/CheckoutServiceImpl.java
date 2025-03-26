package com.project.astanakebab.service;

import com.project.astanakebab.dto.Purchase;
import com.project.astanakebab.dto.PurchaseResponse;
import com.project.astanakebab.entity.Customer;
import com.project.astanakebab.entity.Order;
import com.project.astanakebab.entity.OrderItem;
import com.project.astanakebab.repository.CustomerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService{

    private CustomerRepository customerRepository;

    public CheckoutServiceImpl(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }
    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {

        Order order = purchase.getOrder();

        String orderTrackingNumber = UUID.randomUUID().toString();
        order.setOrderTrackingNumber(orderTrackingNumber);

        // populate order with orderItems
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        Customer customer = purchase.getCustomer();

        //check if this is an existing customer
        String theEmail = customer.getEmail();

        Customer customerFromDB = customerRepository.findByEmail(theEmail);

        if(customerFromDB != null){
            //finding from DB we will assign them accordingly - orders will stay and be more one, but for emails - they will not duplicate
            //here equalizing meaning to preventing from creating another distinct id number - just equalizing to existing one <---> code prevents creating a new distinct ID for a customer by reusing the existing customer object ID by just equalizing
            customer = customerFromDB;
        }
        customer.add(order);

        customerRepository.save(customer); //repository saving

        return new PurchaseResponse(orderTrackingNumber);
    }
}
