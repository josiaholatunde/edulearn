import React, { useRef, useState } from 'react';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/idea.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/clike/clike';

const CodeEditor = ({ language, setLanguage, displayName, value, onChange, examples, userCodeOutput, 
    setUserCodeOutput, handleRunCode, handleSubmitCode, isRunCodeLoading, isSubmitLoading, challengeResult }) => {
    const [isControlled, setIsControlled] = useState(false);
    const [theme, setTheme] = useState('material');

    const editorRef = useRef();
    const wrapper = useRef();

    const handleChange = (editor, data, value) => {
        onChange(value);
    };


  const editorWillUnmount = () => {
        if (wrapper.current) {
        wrapper.current.editor.display.wrapper.remove();
        wrapper.current.hydrated = false;
    }
    if (editorRef.current) {
        editorRef.current.display.wrapper.remove()
    }
  }

  const toLower = language => {
      return !!language ? language.toLowerCase() : language
  }

  return (
    <div className="code-editor" style={{ height: '500px', position: 'relative'}} >
      <div className="editor-header w-100 pl-3 d-flex justify-content-between"  style={{ width: '9rem', height: '40px', background: '#161f2e', color: '#fff'}}>
        <select
            style={{ width: '9rem', background: '#161f2e', color: '#fff', border: 'none', outline: 'none'}}
            id="languageSelect"
            className='h-100'
            value={language}
            onChange={({ target }) => setLanguage(target.value)}
        >
            <option value="JAVASCRIPT">JavaScript</option>
            <option value="PYTHON">Python</option>
            <option value="JAVA">Java</option>
            {/* Add more options for other languages */}
        </select>
        <select
            style={{ width: '9rem', background: '#161f2e', color: '#fff', border: 'none', outline: 'none'}}
            value={theme}
            onChange={({ target }) => setTheme(target.value)}
        >
            <option value="material">Material</option>
            <option value="dracula">Dracula</option>
            <option value="eclipse">Eclipse</option>
            <option value="monokai">MonoKai</option>
            {/* Add more options for other themes */}
        </select>

      </div>
      <div className='editor-body h-100'>
        <ControlledEditor
            ref={wrapper}
            editorDidMount={(e) => editorRef.current = e}
            editorWillUnmount={editorWillUnmount}
            onBeforeChange={handleChange}
            value={value}
            className="code-mirror-wrapper"
            options={{
                lineWrapping: true,
                lint: true,
                mode: language == 'JAVA' ? 'text/x-java': toLower(language),
                theme,
                lineNumbers: true
            }}
            onBeforeChange={(editor, data, value) => {
                setIsControlled(true);
                onChange(value);
            }}
            onChange={(editor, data, value) => {
                onChange(value);
                
            }}
        />
        <div className='action-buttons' style={{ position: 'absolute', bottom: '-5%', right: '1%'}}>
            <button type="button" className="btn btn-cool" style={{ height: '35px', width: '120px'}} onClick={handleRunCode} >
            { isRunCodeLoading && (<span className="spinner-border spinner-border-sm mr12" id="registerForm-btn-loader" role="status" aria-hidden="true"></span>) }
                Run Code
            </button>

            <button type="button" className="btn btn-white ml-3" style={{ height: '35px', width: '115px', background: '#fff'}} onClick={handleSubmitCode}  >
                { isSubmitLoading && (<span className="spinner-border spinner-border-sm mr12" id="registerForm-btn-loader" role="status" aria-hidden="true"></span>) }
                Submit
            </button>
        </div>
        <div className='result-terminal p-3' style={{ height: '44%', background: '#161f2e', color: '#fff' }}>
            <ul className="nav nav-pills bg-cool">
            { examples && examples.length > 0 && examples.map((example, index) => 
                
                <li className="nav-item" role="presentation" key={example.id}>
                    <div className='nav-link' data-bs-toggle="pill" data-bs-target={`#pills-${example.id}`} type="button" role="tab" aria-controls={`pills-${example.id}`} aria-selected="true">
                        Test Case { index + 1 }
                    </div>
                </li>)
            }
            </ul>
            <div className="tab-content mt-3 ml-3" id="pills-tabContent">
                { examples && examples.length > 0 && examples.map((example, index) => 
                    
                    (<div key={example.id} className={`tab-pane fade ${index === 0 ? 'show active' : ''}`} id={`pills-${example.id}`} role="tabpanel" aria-labelledby={`pills-${example.id}-tab`}>
                        <div>Input: { example.input } </div>
                        <div className='my-3'>Expected: { example.output } </div>
                        {
                            challengeResult && challengeResult.algoResult && challengeResult.algoResult.length > 0 && challengeResult.algoResult[index]?.userOutput && (<div>Output: { challengeResult.algoResult[index].userOutput } </div>)
                        }
                        {
                            challengeResult && challengeResult.algoResult && challengeResult.algoResult[0]?.compilationError && (<div >Compilation Error: { challengeResult.algoResult[0]?.compilationError } </div>)
                        }
                        {
                            challengeResult && challengeResult.algoResult && challengeResult.algoResult.length > 0 && challengeResult.algoResult[index]?.testCasePassed && (<div className='my-3' style={{ color: '#fff'}}>Passed: { challengeResult.algoResult[index]?.testCasePassed } </div>)
                        }
                    </div>))
                }
            </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
