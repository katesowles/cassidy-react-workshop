import { Fragment, useState, createContext, useContext } from 'react'
import Description from '@components/Description'

// NOTE: Old, prop-heavy component
function Accordion({ data, titlePosition = 'top' }) {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <div data-accordion>
      {data.map((tab, index) => {
        const isActive = index === activeIndex

        const title = (
          <div
            data-panel-title
            className={isActive ? 'expanded' : ''}
            onClick={() => setActiveIndex(index)}
          >
            <span>{tab.label}</span>
            <span>{tab.icon}</span>
          </div>
        )

        const content = (
          <div data-panel-content className={isActive ? 'expanded' : ''}>
            {tab.content}
          </div>
        )

        return (
          <Fragment key={index}>
            {titlePosition === 'top' ? [title, content] : [content, title]}
          </Fragment>
        )
      })}
    </div>
  )
}

let AccordionContext = createContext()

// NOTE: new Compound Components
const AccordionCC = ({ children }) => {
  // NOTE: ordinarily we might think of explicitly passing props down through the layers of components (aka prop drilling) — but now there's ContextAPI (see above)! Context gives us *implicit* sharing between parents/children as opposed to using props, which gives us *explicit* sharing between parent/children
  const [activeIndex, setActiveIndex] = useState(0)

  // NOTE: we only need to wrap the outer-most component in the AccordionContext.Provider
  return (
    <div data-accordion>
      {children.map((child, index) => {
        return (
          <AccordionContext.Provider
            value={{ activeIndex, setActiveIndex, index }}
          >
            {child}
          </AccordionContext.Provider>
        )
      })}
    </div>
  )
}

let SectionContext = createContext()

const Section = ({ children, disabled }) => {
  return (
    <SectionContext.Provider value={{ disabled }}>
      <div data-section>{children}</div>
    </SectionContext.Provider>
  )
}

const Title = ({ children }) => {
  let { activeIndex, setActiveIndex, index } = useContext(AccordionContext)
  let { disabled } = useContext(SectionContext)
  let isActive = index === activeIndex

  return (
    <div
      data-panel-title
      className={isActive ? 'expanded' : ''}
      onClick={() => {
        if (!disabled) setActiveIndex(index)
      }}
    >
      {children}
    </div>
  )
}

const Content = ({ children }) => {
  let { activeIndex, index } = useContext(AccordionContext)
  let isActive = index === activeIndex

  return (
    <div data-panel-content className={isActive ? 'expanded' : ''}>
      {children}
    </div>
  )
}

function App() {
  const data = [
    {
      label: 'Paris',
      icon: '🧀',
      content: <Description city="paris" />
    },
    {
      label: 'Lech',
      icon: '⛷',
      content: <Description city="lech" />
    },
    {
      label: 'Madrid',
      icon: '🍷',
      content: <Description city="madrid" />
    }
  ]

  // NOTE: Compound Components allow for more flexible and reusable components than piling on a bunch of props
  return (
    <div className="App">
      {/* <Accordion data={data} titlePosition="bottom" disabled={[1]} /> */}

      <AccordionCC>
        <Section>
          <Title>
            Paris <span>🧀</span>
          </Title>
          <Content>
            <Description city="paris" />
          </Content>
        </Section>
        <Section disabled>
          <Title>
            Lech <span>⛷</span>
          </Title>
          <Content>
            <Description city="lech" />
          </Content>
        </Section>
        <Section>
          <Title>
            Madrid <span>🍷</span>
          </Title>
          <Content>
            <Description city="madrid" />
          </Content>
        </Section>
      </AccordionCC>

      <style jsx global>{`
        .App {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #646f74;
        }

        [data-accordion] {
          margin: 0 auto;
          width: 400px;
          box-shadow: 0 10px 20px -10px #646f74;
        }

        [data-panel-title] {
          display: flex;
          justify-content: space-between;
          padding: 15px 15px 15px 25px;
          background: white;
          border-top: 1px solid #edf2f8;
          border-bottom: 1px solid white;
          cursor: pointer;
          transition: border 0.2s, font-weight 0.2s;
        }
        [data-panel-title]::before {
          display: inline;
          content: '+';
        }
        [data-panel-title]:hover {
          border-bottom: 1px solid #646f74;
          font-weight: bold;
        }
        [data-panel-title].expanded {
          border-bottom: 1px solid #646f74;
        }
        [data-panel-title].expanded::before {
          content: '-';
        }
        [data-panel-title].disabled {
          background: #f3f6fc;
          color: #99c9ff;
          border: 1px solid #cee4fd;
          cursor: not-allowed;
        }
        [data-panel-title].disabled::before {
          content: 'x';
        }
        [data-panel-title].disabled:hover {
          border-bottom: 1px solid #cee4fd;
        }

        [data-panel-content] {
          background: #edf2f8;
          visibility: hidden;
          height: 0;
          padding: 0;
          font-size: 0;
          transition: height 0.2s, visibility 0.2s, padding 0.2s;
        }
        [data-panel-content].expanded {
          visibility: visible;
          height: auto;
          padding: 15px;
          font-size: 1em;
          border-bottom: 1px solid #edf2f8;
        }
      `}</style>
    </div>
  )
}

export default App
