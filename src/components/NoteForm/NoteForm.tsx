// src/components/NoteForm/NoteForm.tsx

import { useId } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";

import css from "./NoteForm.module.css";

interface NoteFormValues {
    title: string;
    content: string;
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

const initialValues: NoteFormValues = {
    title: "",
    content: "",
    tag: "Todo",
};

const NoteFormSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, "Title must be at least 3 characters")
        .max(50, "Title is too long")
        .required("Title is required"),
    content: Yup.string()
        .max(500, "Too Long!"),
    tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid Tag")
    .required("Tag is required"),
});

interface NoteFormProps {
    onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
    const fieldId = useId();

    const handleSubmit = (
        values: NoteFormValues,
        actions: FormikHelpers<NoteFormValues>
    ) => {
        console.log(values);
        actions.resetForm();
        onClose();
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={NoteFormSchema}
            onSubmit={handleSubmit}
        >
            <Form className={css.form}>
                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-title`}>Title</label>
                    <input id={`${fieldId}-title`} type="text" name="title" className={css.input} />
                    <ErrorMessage component="span" name="title" className={css.error} />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-content`}>Content</label>
                    <textarea
                        id={`${fieldId}-content`}
                        name="content"
                        rows={8}
                        className={css.textarea}
                    />
                    <ErrorMessage component="span" name="content" className={css.error} />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-tag`}>Tag</label>
                    <select id={`${fieldId}-tag`} name="tag" className={css.select}>
                        <option value="Todo">Todo</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </select>
                    <ErrorMessage component="span" name="tag" className={css.error} />
                </div>

                <div className={css.actions}>
                    <button type="button" className={css.cancelButton} onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={css.submitButton}
                    >
                        Create note
                    </button>
                </div>
            </Form>
        </Formik>
    );
}