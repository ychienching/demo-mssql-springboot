package com.myweb.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "test_pep")
public class TestPep implements Serializable {

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

	@Column(name = "pep")
	private String pep;

	public TestPep() {

	}

	public TestPep(Long id, String pep) {
		this.id = id;
		this.pep = pep;
	}

	@Override
	public String toString() {
		return "MyTestModel [ID=" + id + ", PEP=" + pep + "]";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPep() {
		return pep;
	}

	public void setPep(String pep) {
		this.pep = pep;
	}

}
