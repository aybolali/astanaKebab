package com.project.astanakebab.service;

import com.project.astanakebab.dto.Purchase;
import com.project.astanakebab.dto.PurchaseResponse;


public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
