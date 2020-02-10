import React from 'react';
import './App.css';
import { Form, Row, Col, Button } from 'react-bootstrap';

class App extends React.Component {
  state = {
    error: {
      fname: "",
      lname: "",
      email: "",
      mobile: "",
      hobbies: "",
      occupation: "",
      password: "",
      cpassword: "",
      gender: "",
    },
    fname: "",
    lname: "",
    mname: "",
    email: "",
    mobile: "",
    hobbies: "",
    occupation: "",
    password: "",
    cpassword: "",
    gender: "male",
  }
  handleEvent = (event) => {
    const isRadio = event.target.type === "radio";
    this.setState({
      [event.target.name]: isRadio
        ? event.target.checked
        : event.target.value
    })
  }
  required = (event) => {
    let { error } = this.state;
    event.target.value
      ? this.setState({
        error: {
          ...error,
          [event.target.name]: ""
        }
      })
      : this.setState({
        error: {
          ...error,
          [event.target.name]: "Required field"
        }
      })
  }
  validator = (event) => {
    let mobileRegex = /^\d{10}$/;
    let emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    let passwordRegex = /^[#\w@_-]{6,15}$/;
    let name = event.target.name;
    let { error, mobile, email, password, cpassword } = this.state;
    switch (name) {
      case 'fname':
        this.required(event);
        break;
      case 'lname':
        this.required(event);
        break;
      case 'email':
        emailRegex.test(email)
          ? this.setState({
            error: {
              ...error,
              [event.target.name]: ""
            }
          })
          : this.setState({
            error: {
              ...error,
              [event.target.name]: "Invalid email"
            }
          })
        break;
      case 'password':
        passwordRegex.test(password)
          ? this.setState({
            error: {
              ...error,
              [event.target.name]: ""
            }
          })
          : this.setState({
            error: {
              ...error,
              [event.target.name]: "Invalid password"
            }
          })
        break;
      case 'cpassword':
        (cpassword === password)
          ? this.setState({
            error: {
              ...error,
              [event.target.name]: ""
            }
          })
          : this.setState({
            error: {
              ...error,
              [event.target.name]: "Password mismatch"
            }
          })
        break;
      case 'mobile':
        mobileRegex.test(mobile)
          ? this.setState({
            error: {
              ...error,
              [event.target.name]: ""
            }
          })
          : this.setState({
            error: {
              ...error,
              [event.target.name]: "Invalid mobile number"
            }
          })
        break;
    }
  }
  render() {
    let { error, fname, lname, mname, mobile, email, occupation, password, cpassword, gender } = this.state;
    return (
      <div>
        <div className="container">
          <Form>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>First name</Form.Label>
                  <Form.Control type="text" placeholder="Enter First name" name="fname"
                    onBlur={this.validator}
                    value={fname}
                    onChange={this.handleEvent} />
                  <Form.Text className="text-error">
                    {error.fname}
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Middle name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Middle name" name="mname"
                    value={mname}
                    onChange={this.handleEvent} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Last name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Last name" name="lname"
                    value={lname}
                    onBlur={this.validator}
                    onChange={this.handleEvent} />
                  <Form.Text className="text-error">
                    {error.lname}
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md="8">
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" name="email"
                    value={email}
                    onBlur={this.validator}
                    onChange={this.handleEvent} />
                  <Form.Text className="text-error">
                    {error.email}
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Pasword</Form.Label>
                  <Form.Control type="password" placeholder="Enter password" name="password"
                    value={password}
                    onBlur={this.validator}
                    onChange={this.handleEvent} />
                  <Form.Text className="text-error">
                    {error.password}
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Confirm pasword</Form.Label>
                  <Form.Control type="password" placeholder="Enter password" name="cpassword"
                    value={cpassword}
                    onBlur={this.validator}
                    onChange={this.handleEvent} />
                  <Form.Text className="text-error">
                    {error.cpassword}
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Gender</Form.Label>
                <Form.Group>
                  <Form.Check inline type="radio" label="Male" name="gender" value={"male"}
                    checked
                    onChange={this.handleEvent} />
                  <Form.Check inline type="radio" name="gender" label="Female" value="female"
                    onChange={this.handleEvent} />
                  <Form.Text className="text-error">
                    {error.gender}
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Mobile number</Form.Label>
                  <Form.Control type="text" placeholder="Enter Mobile number" name="mobile"
                    value={mobile}
                    onBlur={this.validator}
                    onChange={this.handleEvent} />
                  <Form.Text className="text-error">
                    {error.mobile}
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <Form.Group>
                  <Form.Label>Occupation</Form.Label>

                  <Form.Control as="select" name="occupation" value={occupation}
                    placeholder="Select"
                    onChange={this.handleEvent}>
                    <option value="" label="-- select ---" />
                    <option value="student" label="student" />
                    <option value="engineer" label="engineer" />
                    <option value="doctor" label="doctor" />
                  </Form.Control>
                  <Form.Text className="text-error">
                    {error.occupation}
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Label>Hobbies</Form.Label>
                <Form.Group>
                  <Form.Check inline type="checkbox" label="Reading" />
                  <Form.Check inline type="checkbox" label="Writing" />
                  <Form.Check inline type="checkbox" label="Singing" />
                  <Form.Check inline type="checkbox" label="Programming" />
                </Form.Group>
                <Form.Text className="text-error">
                  {error.hobbies}
                </Form.Text>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button type="button">Submit</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

export default App;
