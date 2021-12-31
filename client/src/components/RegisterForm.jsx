import React from 'react';
import styled from 'styled-components';
import { mapStateToProps, mapDispatchToProps } from '../store/reducers/rootReducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

const StyledForm = styled.form`
    margin: 300px auto 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border: 1px solid gray;
    border-radius: 10px;
    width: 500px;
    background-color: white;
`

function RegisterForm(props) {
    return (
        <StyledForm>
            <h1>register form</h1>
            <Link to='/'>Home</Link>
            <Link to='/auth'>Auth</Link>
        </StyledForm>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
