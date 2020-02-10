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
      city: "",
      password: "",
      cpassword: "",
      gender: "",
      occupation: ""
    },
    formData: {
      fname: "",
      lname: "",
      mname: "",
      email: "",
      mobile: "",
      city: "",
      password: "",
      cpassword: "",
      gender: "male",
      occupation: ""
    },
    hobbies: [],
    submitMsg: ""
  }

  handleHobbies = (event) => {
    const { hobbies } = this.state
    let index;
    if (event.target.checked) {
      hobbies.push(event.target.value)
    } else {
      index = hobbies.indexOf(event.target.value)
      hobbies.splice(index, 1)
    }
    this.setState({ hobbies: hobbies })
  }
  handleEvent = (event) => {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        [event.target.name]: event.target.value
      }
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
    const mobileRegex = /^\d{10}$/, emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/, passwordRegex = /^[#\w@_-]{6,15}$/;
    const name = event.target.name;
    const { error } = this.state;
    const { mobile, email, password, cpassword } = this.state.formData;
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
              [event.target.name]: "Password must be greater than 6 digit & contains 1 special character"
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
  submitData = () => {
    const { error, formData, hobbies } = this.state;
    let submit = false
    error.map(err => {
      err=""?submit=true:submit=false
    },formData.map(fdata =>{
      fdata=""?submit=false:submit=true
    }))
     console.log(submit)
  }
  render() {
    const { error } = this.state;
    const { fname, lname, mname, mobile, email, city, password, cpassword, occupation, gender } = this.state.formData;
    return (
      <div>
        <div className="container card">
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
              <Col>
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
              <Col>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
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
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control as="select" name="city" value={city}
                    onBlur={this.required}
                    onChange={this.handleEvent}>
                    <option value="" label="-- select ---" />
                    <option value="ahmedabad" label="Ahmedabad" />
                    <option value="surat" label="Surat" />
                    <option value="rajkot" label="Rajkot" />
                  </Form.Control>
                  <Form.Text className="text-error">
                    {error.city}
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Label>Gender</Form.Label>
                <Form.Group>
                  <Form.Check inline type="radio" label="Male" name="gender" value="male"
                    checked={gender === "male"}
                    onChange={this.handleEvent} />
                  <Form.Check inline type="radio" name="gender" label="Female" value="female"
                    checked={gender === "female"}
                    onChange={this.handleEvent} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Occupation</Form.Label>
                <Form.Group>
                  <Form.Check inline type="checkbox" value="student" name="occupation" label="Student"
                    checked={occupation === "student"}
                    onChange={this.handleEvent} />
                  <Form.Check inline type="checkbox" value="engineer" name="occupation" label="Engineer"
                    checked={occupation === "engineer"}
                    onChange={this.handleEvent} />
                  <Form.Check inline type="checkbox" value="doctor" name="occupation" label="Doctor"
                    checked={occupation === "doctor"}
                    onChange={this.handleEvent} />
                </Form.Group>
                <Form.Text className="text-error">
                  {error.occupation}
                </Form.Text>
              </Col>
              <Col>
                <Form.Label>Hobbies</Form.Label>
                <Form.Group>
                  <Form.Check inline type="checkbox" label="Reading" value="Reading" onChange={this.handleHobbies} />
                  <Form.Check inline type="checkbox" label="Writing" value="Writing" onChange={this.handleHobbies} />
                  <Form.Check inline type="checkbox" label="Singing" value="Singing" onChange={this.handleHobbies} />
                  <Form.Check inline type="checkbox" label="Programming" value="Programming" onChange={this.handleHobbies} />
                </Form.Group>
                <Form.Text className="text-error">
                  {error.hobbies}
                </Form.Text>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button type="button" onClick={this.submitData}>Submit</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

export default App;
