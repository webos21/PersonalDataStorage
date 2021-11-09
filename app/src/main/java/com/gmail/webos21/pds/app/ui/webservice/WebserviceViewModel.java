package com.gmail.webos21.pds.app.ui.webservice;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class WebserviceViewModel extends ViewModel {

    private MutableLiveData<String> mText;

    public WebserviceViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("This is notifications fragment");
    }

    public LiveData<String> getText() {
        return mText;
    }
}