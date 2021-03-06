'use babel';

import React from 'react';

const FormGroup = ({ children }) => {
  const { label, input: inputComponent } = children;
  return (
    <atom-panel className="padded">
      <div className="todo-input-label">{label}</div>
      <div className="padded">{inputComponent}</div>
    </atom-panel>
  );
};

const TodoForm = ({ todo, mode, projects, onInputChange, onSubmit }) => {
  const { project, title, description, duration, durationUnit, status } = todo;
  return (
    <form onSubmit={onSubmit}>
      <FormGroup>
        {{
          label: 'Which project are you working on?',
          input: (
            <div>
              <select
                className="todo-input todo-input--projects input-select"
                value={project.path}
                name="project"
                onChange={onInputChange}
                data-key="path"
              >
                {projects.map(({ path, name }) => (
                  <option key={path} value={path}>
                    {name}
                  </option>
                ))}
              </select>
              {projects.length == 0 ? (
                <div className="text-info">Add a project first!</div>
              ) : null}
            </div>
          )
        }}
      </FormGroup>
      <FormGroup>
        {{
          label: 'What are you working on?',
          input: (
            <input
              className="todo-input input-text native-key-bindings"
              value={title}
              type="text"
              name="title"
              onChange={onInputChange}
            />
          )
        }}
      </FormGroup>
      <FormGroup>
        {{
          label: 'How will you do it?',
          input: (
            <textarea
              className="todo-input input-textarea native-key-bindings"
              value={description}
              type="text"
              name="description"
              onChange={onInputChange}
            />
          )
        }}
      </FormGroup>
      <FormGroup>
        {{
          label: 'How much time do you need?',
          input: (
            <div className="todo-horizontal-list">
              <input
                className="todo-input input-text native-key-bindings"
                value={duration}
                type="number"
                name="duration"
                min={1}
                onChange={onInputChange}
              />
              <select
                className="todo-input input-select"
                value={durationUnit}
                name="durationUnit"
                onChange={onInputChange}
              >
                <option value="minutes">min</option>
                <option value="hours">hr</option>
                <option value="days">day</option>
                <option value="weeks">week</option>
              </select>
            </div>
          )
        }}
      </FormGroup>
      <FormGroup>
        {{
          label: 'Activate on submit?',
          input: (
            <label className="input-label">
              <input
                className="input-toggle"
                type="checkbox"
                name="status"
                checked={status === 'active'}
                onChange={onInputChange}
              />
              {status === 'active' ? 'yes' : 'no'}
            </label>
          )
        }}
      </FormGroup>
      {mode === 'edit' && (
        <FormGroup>
          {{
            input: (
              <input
                className="todo-input btn btn-primary"
                type="submit"
                value="Update"
              />
            )
          }}
        </FormGroup>
      )}
      {mode === 'new' && (
        <FormGroup>
          {{
            input: (
              <input
                className="todo-input btn btn-primary"
                type="submit"
                value="Submit"
                disabled={projects.length == 0 ? true : false}
              />
            )
          }}
        </FormGroup>
      )}
    </form>
  );
};

export default TodoForm;
