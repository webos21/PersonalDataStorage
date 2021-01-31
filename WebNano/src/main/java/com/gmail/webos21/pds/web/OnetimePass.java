package com.gmail.webos21.pds.web;

import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import com.gmail.webos21.crypto.Base64;

public class OnetimePass {

	private static String ALG_AES_KEY = "AES";

	private static String ALG_AES_CIPHER = "AES/CBC/PKCS5Padding";

	public static final String genOtp() {
		Double dr = Math.random();
		int ir = (int) (dr * 1000000);
		return String.format("%06d", ir);
	}

	public static final String encryptOtp(String otp) {
		String validPassword = null;

		byte[] keyBytes = "PasswordBook".getBytes();
		byte[] iv = "PasswordBook1234".getBytes();

		try {
			MessageDigest sha256 = MessageDigest.getInstance("SHA-256");
			byte[] aesKeyBytes = sha256.digest(keyBytes);

			SecretKeySpec secretKey = new SecretKeySpec(aesKeyBytes, ALG_AES_KEY);

			Cipher cipher = Cipher.getInstance(ALG_AES_CIPHER);
			cipher.init(Cipher.ENCRYPT_MODE, secretKey, new IvParameterSpec(iv));
			cipher.update(otp.getBytes());
			byte[] encryptBytes = cipher.doFinal();

			validPassword = Base64.encodeToString(encryptBytes, Base64.DEFAULT);
			validPassword = validPassword.trim();

			return validPassword;
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (NoSuchPaddingException e) {
			e.printStackTrace();
		} catch (InvalidKeyException e) {
			e.printStackTrace();
		} catch (InvalidAlgorithmParameterException e) {
			e.printStackTrace();
		} catch (IllegalBlockSizeException e) {
			e.printStackTrace();
		} catch (BadPaddingException e) {
			e.printStackTrace();
		}

		return validPassword;
	}
}
