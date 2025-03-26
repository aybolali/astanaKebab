package com.project.astanakebab.dto;

import com.project.astanakebab.entity.Address;
import com.project.astanakebab.entity.Customer;
import com.project.astanakebab.entity.Order;
import com.project.astanakebab.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
