import React, { Component } from "react";
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";
import AsyncSelect from "react-select/lib/Async";
import "./css/extra_person.css";

class ExtraStudent extends Component {

    createdUser = {
        name: "",
        neptun: "",
        email: "",
        password: "default",
        role: "student",
    };

    createdStudent = {
        neptun: "",
        gyakid: "",
    };

    constructor(props) {
        super(props);

        this.state = {
            createdUser: this.createdUser,
            createdStudent: this.createdStudent,
            redirect: false,
            alertVisible: false,
            btnDisabled: false,

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.selectGyak = this.selectGyak.bind(this);

    }


    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let createdUser = { ...this.state.createdUser };
        createdUser[name] = value;
        this.setState({ createdUser });
    }

    selectGyak(gyak) {
        let createdUser = { ...this.state.createdUser };
        createdUser.gyakid = gyak.id;
        this.setState({
            createdStudent: {
                neptun: createdUser.neptun,
                gyakid: gyak.id,
            }
        });

        return gyak;
    }

    async adduser() {
        const { createdUser } = this.state;

        await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(createdUser)
        });
        console.log("megnyomtam")
        this.setState({ alertVisible: true });

    }

    async addgyak() {

        const { createdStudent } = this.state;
        await fetch("/api/students", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(createdStudent)
        });
    }

    toggleBtn = () => {
        this.setState(prevState => ({
            btnDisabled: !prevState.btnDisabled,
            alertVisible: !prevState.alertVisible,
        }));
    };

    handleSubmit(ev) {
        console.log("asdasdasdasd")
        ev.preventDefault();
        this.toggleBtn();
        this.adduser();
        this.addgyak();
        window.setTimeout(() => {
            this.toggleBtn();

        }, 2000);

    }

    closeAlert() {
        this.setState({ alertVisible: false });
    }

    render() {

        const getgyak = (inputValue, callback) => {

            fetch("/api/labors", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                //body: JSON.stringify(item)

            }).then((response) => response.json())
                .then((response) => {
                    callback(response);
                });
        };

        const { createdUser } = this.state;
        const { btnDisabled } = this.state;


        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="head">Diák neve:</Label>
                        <Input required className="extra_info" type="text" name="name" id="name"
                            value={createdUser.name || ""} onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="head">E-mail:</Label>
                        <Input required className="extra_info" type="text" name="email" id="email"
                            value={createdUser.email || ""} onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="head">Neptun:</Label>
                        <Input required className="extra_info" type="text" name="neptun" id="neptun"
                            value={createdUser.neptun || ""} onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup>

                        <p>Gyakorlat:</p>
                        <AsyncSelect
                            placeholder={"Név"}
                            className="extra_info"
                            defaultOptions
                            loadOptions={getgyak}
                            getOptionLabel={(option) => option.title}
                            getOptionValue={(option) => option.id}
                            onChange={this.selectGyak}
                        />

                    </FormGroup>

                    <FormGroup id="buttonFrom">
                        <Button disabled={btnDisabled} variant={"success"} color="primary"
                            type="submit">Regisztrálás</Button>

                    </FormGroup>

                    <Alert isOpen={this.state.alertVisible} toggle={this.closeAlert} color="success">
                        Sikeresen felveted a diákot!
                    </Alert>
                </Form>
                <label htmlFor="file-upload" className="extra-file-upload">
                        Tallózás...
                    </label>
                    <input required className="extra-input" id="file-upload" type="file" accept=".xls,.xlsx"
                        onChange={(event) => this.uploadFile(event)} />
            </div>
        );
    }
}

export default ExtraStudent;
