import React from 'react';
import './App.css';
import { Form, Row, Col, Button } from 'react-bootstrap';

class App extends React.Component {
  state = {
    error: {
      First_name: "",
      Last_name: "",
      Email_address: "",
      Mobile_number: "",
      Hobbies: "",
      City: "",
      Password: "",
      Confirm_password: "",
      Gender: "",
      Occupation: ""
    },
    formData: {
      First_name: "",
      Last_name: "",
      Middle_name: "",
      Email_address: "",
      Mobile_number: "",
      Hobbies: [],
      City: "",
      Password: "",
      Confirm_password: "",
      Gender: "",
      Occupation: ""
    },
    submitMsg: ""
  }

  handleHobbies = (event) => {
    const { Hobbies } = this.state.formData;
    const { formData, error } = this.state;
    let index;
    if (event.target.checked) {
      Hobbies.push(event.target.value)
      error[event.target.name] = "";
      this.setState({ error, submitMsg: "" })
    }
    else {
      index = Hobbies.indexOf(event.target.value)
      Hobbies.splice(index, 1)
    }
    this.setState({ formData: { ...formData, Hobbies: Hobbies }, submitMsg: "" })
  }
  handleChange = (event) => {
    const { formData, error } = this.state;
    const isCheckBox = event.target.type;
    this.setState({
      formData: {
        ...formData,
        [event.target.name]: event.target.value
      }
    })
    if (isCheckBox) {
      error[event.target.name] = "";
      this.setState({ error, submitMsg: "" });
    }
  }
  required = (event) => {
    const { error } = this.state;
    if (event.target.value)
      error[event.target.name] = "";
    else
      error[event.target.name] = event.target.name.replace("_", " ") + " is required.";
    this.setState({ error })
  }
  validator = (event) => {
    const mobileRegex = /^\d{10}$/, emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/, passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
    const { name } = event.target;
    const { error } = this.state;
    const { Mobile_number, Email_address, Password, Confirm_password } = this.state.formData;
    switch (name) {
      case 'First_name':
        this.required(event);
        break;
      case 'Last_name':
        this.required(event);
        break;
      case 'Email_address':
        if (emailRegex.test(Email_address))
          error[event.target.name] = "";
        else
          error[event.target.name] = event.target.name.replace("_", " ") + " is invalid.";
        break;
      case 'Password':
        if (passwordRegex.test(Password))
          error[event.target.name] = "";
        else
          error[event.target.name] = "Password must be greater than 6 characters & Combination of upper and lower case & special character";
        break;
      case 'Confirm_password':
        if (!Confirm_password)
          error[event.target.name] = event.target.name.replace("_", " ") + " is required.";
        else if (Confirm_password === Password && passwordRegex.test(Confirm_password))
          error[event.target.name] = "";
        else
          error[event.target.name] = event.target.name.replace("_", " ") + " is invalid or mismatch.";
        break;
      case 'Mobile_number':
        if (mobileRegex.test(Mobile_number))
          error[event.target.name] = "";
        else
          error[event.target.name] = event.target.name.replace("_", " ") + " is invalid.";
        break;
    }
    this.setState({ error })
  }
  submitData = () => {
    let { formData, error } = this.state;
    let submit = "initial";
    Object.keys(formData).map(data => {
      if (data !== "Middle_name")
        if (formData[data] == "" || formData[data].length === 0) {
          error[data] = data.replace("_", " ") + " is required.";
          this.setState({ error })
        }
    })

    Object.values(error).map(errMsg => {
      if(!errMsg && submit)
          submit = "success"
      else
          submit = ""
  })
  this.setState({ submitMsg: submit })
  }

  render() {
    const { error } = this.state;
    const { First_name, Last_name, Middle_name, Mobile_number, Email_address, City, Password, Confirm_password, Occupation, Gender } = this.state.formData;
    const { submitMsg } = this.state;
    return (
      <div>
        <div className="container card">
          <Form>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>First name <label className="required-field">*</label></Form.Label>
                  <Form.Control type="text" placeholder="Enter First name" name="First_name"
                    className={error.First_name ? "red-border" : ""}
                    onBlur={this.validator}
                    value={First_name}
                    onChange={this.handleChange} />
                  {error.First_name ? <Form.Text className="text-error">{error.First_name}</Form.Text> : <></>}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Middle name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Middle name" name="Middle_name"
                    value={Middle_name}
                    onChange={this.handleChange} />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group>
                  <Form.Label>Last name <label className="required-field">*</label></Form.Label>
                  <Form.Control type="text" placeholder="Enter Last name" name="Last_name"
                    className={error.Last_name ? "red-border" : ""}
                    value={Last_name}
                    onBlur={this.validator}
                    onChange={this.handleChange} />
                  {error.Last_name ? <Form.Text className="text-error">{error.Last_name}</Form.Text> : <></>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Email address <label className="required-field">*</label></Form.Label>
                  <Form.Control type="email" placeholder="Enter email" name="Email_address"
                    className={error.Email_address ? "red-border" : ""}
                    value={Email_address}
                    onBlur={this.validator}
                    onChange={this.handleChange} />
                  {error.Email_address ? <Form.Text className="text-error">{error.Email_address}</Form.Text> : <></>}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Mobile number <label className="required-field">*</label></Form.Label>
                  <Form.Control type="text" placeholder="Enter Mobile number" name="Mobile_number"
                    className={error.Mobile_number ? "red-border" : ""}
                    value={Mobile_number}
                    onBlur={this.validator}
                    onChange={this.handleChange} />
                  {error.Mobile_number ? <Form.Text className="text-error">{error.Mobile_number}</Form.Text> : <></>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Password <label className="required-field">*</label></Form.Label>
                  <Form.Control type="password" placeholder="Enter password" name="Password"
                    className={error.Password ? "red-border" : ""}
                    value={Password}
                    onBlur={this.validator}
                    onChange={this.handleChange} />
                  {error.Password ? <Form.Text className="text-error">{error.Password}</Form.Text> : <></>}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Confirm pasword <label className="required-field">*</label></Form.Label>
                  <Form.Control type="password" placeholder="Enter password" name="Confirm_password"
                    className={error.Confirm_password ? "red-border" : ""}
                    value={Confirm_password}
                    onBlur={this.validator}
                    onChange={this.handleChange} />
                  {error.Confirm_password ? <Form.Text className="text-error">{error.Confirm_password}</Form.Text> : <></>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>City <label className="required-field">*</label></Form.Label>
                  <Form.Control as="select" name="City" value={City}
                    className={error.City ? "red-border" : ""}
                    onBlur={this.required}
                    onChange={this.handleChange}>
                    <option value="" label="-- select ---" />
                    <option value="ahmedabad" label="Ahmedabad" />
                    <option value="surat" label="Surat" />
                    <option value="rajkot" label="Rajkot" />
                  </Form.Control>
                  {error.City ? <Form.Text className="text-error">{error.City}</Form.Text> : <></>}
                </Form.Group>
              </Col>
              <Col>
                <Form.Label>Gender <label className="required-field">*</label></Form.Label>
                <Form.Group>
                  <Form.Check inline type="radio" label="Male" name="Gender" value="male" id="male"
                    onBlur={this.required}
                    checked={Gender === "male"}
                    onChange={this.handleChange} />
                  <Form.Check inline type="radio" name="Gender" label="Female" value="female" id="female"
                    onBlur={this.required}
                    checked={Gender === "female"}
                    onChange={this.handleChange} />
                </Form.Group>
                {error.Gender ? <Form.Text className="text-error">{error.Gender}</Form.Text> : <></>}
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Occupation <label className="required-field">*</label></Form.Label>
                <Form.Group>
                  <Form.Check inline type="checkbox" value="student" name="Occupation" label="Student" id="Student"
                    checked={Occupation === "student"}
                    onChange={this.handleChange} />
                  <Form.Check inline type="checkbox" value="engineer" name="Occupation" label="Engineer" id="Engineer"
                    checked={Occupation === "engineer"}
                    onChange={this.handleChange} />
                  <Form.Check inline type="checkbox" value="doctor" name="Occupation" label="Doctor" id="Doctor"
                    checked={Occupation === "doctor"}
                    onChange={this.handleChange} />
                </Form.Group>
                {error.Occupation ? <Form.Text className="text-error">{error.Occupation}</Form.Text> : <></>}
              </Col>
              <Col>
                <Form.Label>Hobbies <label className="required-field">*</label></Form.Label>
                <Form.Group>
                  <Form.Check inline type="checkbox" id="Reading" label="Reading" name="Hobbies" value="Reading" onChange={this.handleHobbies} />
                  <Form.Check inline type="checkbox" id="Writing" label="Writing" name="Hobbies" value="Writing" onChange={this.handleHobbies} />
                  <Form.Check inline type="checkbox" id="Singing" label="Singing" name="Hobbies" value="Singing" onChange={this.handleHobbies} />
                  <Form.Check inline type="checkbox" id="Programming" label="Programming" name="Hobbies" value="Programming" onChange={this.handleHobbies} />
                </Form.Group>
                {error.Hobbies ? <Form.Text className="text-error">{error.Hobbies}</Form.Text> : <></>}
              </Col>
            </Row>
            <Row>
              <Col>
                <Button type="button" onClick={this.submitData}>Submit</Button>
                {submitMsg ? <Form.Text className="submit">{submitMsg}</Form.Text> : <></>}
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

export default App;
