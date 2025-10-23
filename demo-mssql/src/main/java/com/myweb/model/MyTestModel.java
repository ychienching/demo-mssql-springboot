package com.myweb.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "MY_TEST")
public class MyTestModel implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5846746506914485820L;

	@Id
	@Column(name = "id")

	@GeneratedValue(strategy = GenerationType.IDENTITY)

//	@GeneratedValue(strategy=GenerationType.AUTO)
//	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "id_Sequence")
//	@SequenceGenerator
//	(name = "id_Sequence", sequenceName = "MY_TEST_SEQ", allocationSize = 1, initialValue = 1)
	private Long id;

	@Column(name = "name")
	private String name;

	@Column(name = "address")
	private String address;

	@Column(name = "city")
	private String city;

	public MyTestModel() {

	}

	public MyTestModel(Long id, String name, String address, String city) {
		this.id = id;
		this.name = name;
		this.address = address;
		this.city = city;
	}

	@Override
	public String toString() {
		return "MyTestModel [ID=" + id + ", NAME=" + name + ", ADDRESS=" + address + ", CITY=" + city + "]";
	}

	public String toJSON() {
		return "{\"ID\": \"" + id + "\", \"NAME\": \"" + name + "\", \"ADDRESS\": \"" + address
				+ "\", \"CITY\": \"" + city + "\"}";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

}
