package org.csu.mypetstoreclient.service;

import org.csu.mypetstoreclient.common.CommonResponse;
import org.csu.mypetstoreclient.entity.Cart;
import org.csu.mypetstoreclient.vo.CartVO;

import javax.validation.Valid;
import java.util.List;

public interface CartService {

    CommonResponse addCart(String username,String itemId);

    CommonResponse updateCart(@Valid Cart cart);

    CommonResponse<List<CartVO>> getCartByAccount(String username);

    CommonResponse removeItemByItemId(String username, String itemId);
}
