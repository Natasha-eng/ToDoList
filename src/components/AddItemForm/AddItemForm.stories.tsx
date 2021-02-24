import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';
import {AddItemForm, AddItemFormPropsType} from "./AddItemForm";
import {action} from "@storybook/addon-actions";


export default {
    title: 'TodolistsList/AddItemForm',
    component: AddItemForm,
    argTypes: {
        backgroundColor: {control: 'color'},
        onClick: {
            description: 'AddItemForm clicked'
        }
    },
} as Meta;

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({});

AddItemFormExample.args = {
    addItem: action('AddItemForm clicked')
}

const Template2: Story<AddItemFormPropsType> = (args) => <AddItemForm  {...args}/>;

export const AddItemFormDisabledExample = Template.bind({});

AddItemFormDisabledExample.args = {
    addItem: action('AddItemForm clicked'),
    disabled : true
}



