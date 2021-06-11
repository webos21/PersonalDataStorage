/*******************************************************************************
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *  
 *   http://www.apache.org/licenses/LICENSE-2.0
 *  
 *  Unless required by applicable law or agreed to in writing,
 *  software distributed under the License is distributed on an
 *  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 *  KIND, either express or implied.  See the License for the
 *  specific language governing permissions and limitations
 *  under the License.
 *  
 *******************************************************************************/
//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.1.1-b02-fcs 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2008.12.04 at 02:20:17 PM IST 
//

package com.gmail.webos21.webdav.model;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAnyElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.w3c.dom.Element;

/**
 * The <code>resourcetype</code> Property per the WebDAV specification [RFC
 * 4918]
 * 
 * <pre>
 *    Name:       resourcetype
 *    Namespace:  DAV:
 *    Purpose:    Specifies the nature of the resource.
 *    Description: The resourcetype property MUST be defined on all DAV
 *    compliant resources.  The default value is empty.
 * 
 *    &lt;!ELEMENT resourcetype ANY &gt;
 * </pre>
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = { "collection", "any" })
@XmlRootElement(name = "resourcetype")
public class Resourcetype {

	protected Collection collection;
	@XmlAnyElement
	protected List<Element> any;

	/**
	 * Gets the value of the collection property.
	 * 
	 * @return possible object is {@link Collection }
	 */
	public Collection getCollection() {
		return collection;
	}

	/**
	 * Sets the value of the collection property.
	 * 
	 * @param value allowed object is {@link Collection }
	 */
	public void setCollection(Collection value) {
		this.collection = value;
	}

	/**
	 * Gets the value of the any property.
	 * <p>
	 * This accessor method returns a reference to the live list, not a snapshot.
	 * Therefore any modification you make to the returned list will be present
	 * inside the JAXB object. This is why there is not a <CODE>set</CODE> method
	 * for the any property.
	 * <p>
	 * For example, to add a new item, do as follows:
	 * 
	 * <pre>
	 * getAny().add(newItem);
	 * </pre>
	 * <p>
	 * Objects of the following type(s) are allowed in the list {@link Element }
	 */
	public List<Element> getAny() {
		if (any == null) {
			any = new ArrayList<Element>();
		}
		return this.any;
	}

}
