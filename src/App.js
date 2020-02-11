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
  handleEvent = (event) => {
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
    if (event.target.value) {
      error[event.target.name] = "";
      this.setState({ error });
      event.target.style.borderColor = "green";
    }
    else {
      error[event.target.name] = event.target.name.replace("_", " ") + " is required.";
      event.target.style.borderColor = "red";
      this.setState({ error })
    }
  }
  validator = (event) => {
    const mobileRegex = /^\d{10}$/, emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/, passwordRegex = /^[#\w@_-]{6,15}$/;
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
        if (emailRegex.test(Email_address)) {
          error[event.target.name] = "";
          this.setState({ error, submitMsg: "" })
          event.target.style.borderColor = "green";
        }
        else {
          error[event.target.name] = event.target.name.replace("_", " ") + " is required.";
          event.target.style.borderColor = "red";
          this.setState({ error, submitMsg: "" })
        }
        break;
      case 'Password':
        if (passwordRegex.test(Password)) {
          error[event.target.name] = "";
          this.setState({ error, submitMsg: "" })
          event.target.style.borderColor = "green";
        }
        else {
          error[event.target.name] = "Password must be greater than 6 digit & contains 1 special character";
          event.target.style.borderColor = "red";
          this.setState({ error, submitMsg: "" })
        }
        break;
      case 'Confirm_password':
        if (Confirm_password === "") {
          error[event.target.name] = event.target.name.replace("_", " ") + " is required.";
          event.target.style.borderColor = "red";
          this.setState({ error, submitMsg: "" })
        }
        else if (Confirm_password === Password && passwordRegex.test(Confirm_password)) {
          error[event.target.name] = "";
          this.setState({ error, submitMsg: "" })
          event.target.style.borderColor = "green";
        }
        else {
          error[event.target.name] = event.target.name.replace("_", " ") + " is invalid or mismatch.";
          event.target.style.borderColor = "red";
          this.setState({ error, submitMsg: "" })
        }
        break;
      case 'Mobile_number':
        if (mobileRegex.test(Mobile_number)) {
          error[event.target.name] = "";
          event.target.style.borderColor = "green";
          this.setState({ error, submitMsg: "" })
        }
        else {
          error[event.target.name] = event.target.name.replace("_", " ") + " is invalid.";
          event.target.style.borderColor = "red";
          this.setState({ error, submitMsg: "" })
        }
        break;
    }
  }
  submitData = () => {
    const { formData, error, submitMsg } = this.state;
    Object.keys(formData).map(data => {
      if (formData[data] == "" || formData[data].length === 0) {
        error[data] = data.replace("_", " ") + " is required.";
        this.setState({ error, submitMsg: "" })
      }
      else {
        this.setState({ submitMsg: "SUCCESS!!" })
      }
    })
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
                  <Form.Label>First name*</Form.Label>
                  <Form.Control type="text" placeholder="Enter First name" name="First_name"
                    onBlur={this.validator}
                    value={First_name}
                    onChange={this.handleEvent} />
                  <Form.Text className="text-error">
                    {error.First_name}
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Middle name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Middle name" name="Middle_name"
                    value={Middle_name}
                    onBlur={this.required}
                    onChange={this.handleEvent} />
                  <Form.Text className="text-error">
                    {error.Middle_name}
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Last name*</Form.Label>
                  <Form.Control type="text" placeholder="Enter Last name" name="Last_name"
                    value={Last_name}
                    onBlur={this.validator}
                    onChange={this.handleEvent} />
                  <Form.Text className="text-error">
                    {error.Last_name}
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Email address*</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" name="Email_address"
                    value={Email_address}
                    onBlur={this.validator}
                    onChange={this.handleEvent} />
                  <Form.Text className="text-error">
                    {error.Email_address}
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Mobile number*</Form.Label>
                  <Form.Control type="text" placeholder="Enter Mobile number" name="Mobile_number"
                    value={Mobile_number}
                    onBlur={this.validator}
                    onChange={this.handleEvent} />
                  <Form.Text className="text-error">
                    {error.Mobile_number}
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Password*</Form.Label>
                  <Form.Control type="password" placeholder="Enter password" name="Password"
                    value={Password}
                    onBlur={this.validator}
                    onChange={this.handleEvent} />
                  <Form.Text className="text-error">
                    {error.Password}
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Confirm pasword*</Form.Label>
                  <Form.Control type="password" placeholder="Enter password" name="Confirm_password"
                    value={Confirm_password}
                    onBlur={this.validator}
                    onChange={this.handleEvent} />
                  <Form.Text className="text-error">
                    {error.Confirm_password}
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>City*</Form.Label>
                  <Form.Control as="select" name="City" value={City}
                    onBlur={this.required}
                    onChange={this.handleEvent}>
                    <option value="" label="-- select ---" />
                    <option value="ahmedabad" label="Ahmedabad" />
                    <option value="surat" label="Surat" />
                    <option value="rajkot" label="Rajkot" />
                  </Form.Control>
                  <Form.Text className="text-error">
                    {error.City}
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Label>Gender*</Form.Label>
                <Form.Group>
                  <Form.Check inline type="radio" label="Male" name="Gender" value="male"
                    onBlur={this.required}
                    checked={Gender === "male"}
                    onChange={this.handleEvent} />
                  <Form.Check inline type="radio" name="Gender" label="Female" value="female"
                    onBlur={this.required}
                    checked={Gender === "female"}
                    onChange={this.handleEvent} />
                </Form.Group>
                <Form.Text className="text-error">
                  {error.Gender}
                </Form.Text>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Occupation*</Form.Label>
                <Form.Group>
                  <Form.Check inline type="checkbox" value="student" name="Occupation" label="Student"
                    checked={Occupation === "student"}
                    onChange={this.handleEvent} />
                  <Form.Check inline type="checkbox" value="engineer" name="Occupation" label="Engineer"
                    checked={Occupation === "engineer"}
                    onChange={this.handleEvent} />
                  <Form.Check inline type="checkbox" value="doctor" name="Occupation" label="Doctor"
                    checked={Occupation === "doctor"}
                    onChange={this.handleEvent} />
                </Form.Group>
                <Form.Text className="text-error">
                  {error.Occupation}
                </Form.Text>
              </Col>
              <Col>
                <Form.Label>Hobbies*</Form.Label>
                <Form.Group>
                  <Form.Check inline type="checkbox" label="Reading" name="Hobbies" value="Reading" onChange={this.handleHobbies} />
                  <Form.Check inline type="checkbox" label="Writing" name="Hobbies" value="Writing" onChange={this.handleHobbies} />
                  <Form.Check inline type="checkbox" label="Singing" name="Hobbies" value="Singing" onChange={this.handleHobbies} />
                  <Form.Check inline type="checkbox" label="Programming" name="Hobbies" value="Programming" onChange={this.handleHobbies} />
                </Form.Group>
                <Form.Text className="text-error">
                  {error.Hobbies}
                </Form.Text>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button type="button" onClick={this.submitData}>Submit</Button>
                <Form.Text className="submit-msg">
                  {submitMsg}
                </Form.Text>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

export default App;
