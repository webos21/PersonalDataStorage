package com.gmail.webos21.nano;

public class DynamicParameter {

	private Class<? extends UriHandler> instanceClass;
	private Class<?>[] classes;
	private Object[] values;

	public DynamicParameter(Class<? extends UriHandler> instanceClass, Object... args) {
		this.instanceClass = instanceClass;
		this.classes = new Class<?>[args.length];
		for (int i = 0; i < args.length; i++) {
			classes[i] = args[i].getClass();
		}
		this.values = args;
	}

	public Class<? extends UriHandler> getInstanceClass() {
		return instanceClass;
	}

	public void setInstanceClass(Class<? extends UriHandler> instanceClass) {
		this.instanceClass = instanceClass;
	}

	public Class<?>[] getClasses() {
		return classes;
	}

	public void setClasses(Class<?>[] classes) {
		this.classes = classes;
	}

	public Object[] getValues() {
		return values;
	}

	public void setValues(Object[] values) {
		this.values = values;
	}

}
