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

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

/**
 * The <code>lockscope</code> XML element per the WebDAV specification [RFC
 * 4918]
 * 
 * <pre>
 *    Name:       lockscope
 *    Namespace:  DAV:
 *    Purpose:    Specifies whether a lock is an exclusive lock, or a
 *    shared lock.
 * 
 *    &lt;!ELEMENT lockscope (exclusive | shared) &gt;
 * </pre>
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = { "exclusive", "shared" })
@XmlRootElement(name = "lockscope")
public class Lockscope {

	protected Exclusive exclusive;
	protected Shared shared;

	/**
	 * Gets the value of the exclusive property.
	 * 
	 * @return possible object is {@link Exclusive }
	 */
	public Exclusive getExclusive() {
		return exclusive;
	}

	/**
	 * Sets the value of the exclusive property.
	 * 
	 * @param value allowed object is {@link Exclusive }
	 */
	public void setExclusive(Exclusive value) {
		this.exclusive = value;
	}

	/**
	 * Gets the value of the shared property.
	 * 
	 * @return possible object is {@link Shared }
	 */
	public Shared getShared() {
		return shared;
	}

	/**
	 * Sets the value of the shared property.
	 * 
	 * @param value allowed object is {@link Shared }
	 */
	public void setShared(Shared value) {
		this.shared = value;
	}

}
