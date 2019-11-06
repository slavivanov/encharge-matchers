import * as _ from "lodash";
import { eventPassesFilters } from "../src/encharge-matchers";

describe("/event", () => {
  it("validate when no filters", async () => {
    const event = {
      prop1: true,
      prop2: 123
    };
    const filters = undefined as any;
    expect(eventPassesFilters({ event, filters })).toEqual(true);
  });

  it("validate when filter succeeds", async () => {
    const event = {
      prop1: "hm",
      prop2: 123
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "is",
            propertyValue: "hm"
          }
        ]
      })
    ).toEqual(true);
  });

  it("invalidate when filter fails", async () => {
    const event = {
      prop1: "hm",
      prop2: 123
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "is",
            propertyValue: "tad"
          }
        ]
      })
    ).toEqual(false);
  });

  it("compare is string to string", async () => {
    const event = {
      prop1: "tada"
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "is",
            propertyValue: "not"
          }
        ]
      })
    ).toEqual(false);
  });

  it("compare is boolean to string", async () => {
    const event = {
      prop1: true
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "is",
            propertyValue: "not"
          }
        ]
      })
    ).toEqual(false);
  });

  it("compare is boolean to true", async () => {
    const event = {
      prop1: true
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "is",
            propertyValue: "true"
          }
        ]
      })
    ).toEqual(true);
  });

  it("compare is boolean to false", async () => {
    const event = {
      prop1: false
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "is",
            propertyValue: "false"
          }
        ]
      })
    ).toEqual(true);
  });

  it("compare is number to string", async () => {
    const event = {
      prop1: 123
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "is",
            propertyValue: "123"
          }
        ]
      })
    ).toEqual(true);
  });

  it("compare is float to string", async () => {
    const event = {
      prop1: 123.1
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "is",
            propertyValue: "123.1"
          }
        ]
      })
    ).toEqual(true);
  });

  it("compare is undefined to string", async () => {
    const event = {
      prop1: undefined
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "is",
            propertyValue: ""
          }
        ]
      })
    ).toEqual(false);
  });

  it("compare is null to string", async () => {
    const event = {
      prop1: null
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "is",
            propertyValue: ""
          }
        ]
      })
    ).toEqual(false);
  });

  it("compare is not null to string", async () => {
    const event = {
      prop1: null
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "is not",
            propertyValue: "hmm"
          }
        ]
      })
    ).toEqual(true);
  });

  it("compare is not undefined to string", async () => {
    const event = {
      prop1: undefined
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "is not",
            propertyValue: "something"
          }
        ]
      })
    ).toEqual(true);
  });

  it("compare is not number to string", async () => {
    const event = {
      prop1: 123
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "is not",
            propertyValue: "123"
          }
        ]
      })
    ).toEqual(false);
  });

  it("compare is not boolean to string", async () => {
    const event = {
      prop1: true
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "is not",
            propertyValue: "true"
          }
        ]
      })
    ).toEqual(false);
  });

  it("compare is not false to string", async () => {
    const event = {
      prop1: false
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "is not",
            propertyValue: "false"
          }
        ]
      })
    ).toEqual(false);
  });

  it("compare successful contains", async () => {
    const event = {
      prop1: "222"
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "contains",
            propertyValue: "2"
          }
        ]
      })
    ).toEqual(true);
  });

  it("compare contains with equal strings", async () => {
    const event = {
      prop1: "222"
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "contains",
            propertyValue: "222"
          }
        ]
      })
    ).toEqual(true);
  });

  it("compare less than with number and string", async () => {
    const event = {
      prop1: 111
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "is less than",
            propertyValue: "222"
          }
        ]
      })
    ).toEqual(true);
  });

  it("compare failed less than with number and string", async () => {
    const event = {
      prop1: 333
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "is less than",
            propertyValue: "222"
          }
        ]
      })
    ).toEqual(false);
  });

  it("compare successful more than with number and string", async () => {
    const event = {
      prop1: 333
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "is more than",
            propertyValue: "222"
          }
        ]
      })
    ).toEqual(true);
  });

  it("compare failed more than with number and string", async () => {
    const event = {
      prop1: 111
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "is more than",
            propertyValue: "222"
          }
        ]
      })
    ).toEqual(false);
  });

  it("compare is empty with undefined", async () => {
    const event = {
      prop1: undefined
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "is empty",
            propertyValue: ""
          }
        ]
      })
    ).toEqual(true);
  });

  it("compare is empty with null", async () => {
    const event = {
      prop1: null
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "is empty",
            propertyValue: ""
          }
        ]
      })
    ).toEqual(true);
  });

  it("compare is empty with empty string", async () => {
    const event = {
      prop1: ""
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "is empty",
            propertyValue: ""
          }
        ]
      })
    ).toEqual(true);
  });

  it("compare is not empty with undefined", async () => {
    const event = {
      prop1: undefined
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "is not empty",
            propertyValue: ""
          }
        ]
      })
    ).toEqual(false);
  });

  it("compare is not empty with null", async () => {
    const event = {
      prop1: null
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "is not empty",
            propertyValue: ""
          }
        ]
      })
    ).toEqual(false);
  });

  it("compare is not empty with empty string", async () => {
    const event = {
      prop1: ""
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "is not empty",
            propertyValue: ""
          }
        ]
      })
    ).toEqual(false);
  });

  it("compare is not empty with empty string", async () => {
    const event = {
      prop1: "123"
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "is not empty",
            propertyValue: ""
          }
        ]
      })
    ).toEqual(true);
  });

  it("matches shouldn't contain ", async () => {
    const event = {
      prop1: "Some text here"
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "does not contain",
            propertyValue: "hm"
          }
        ]
      })
    ).toEqual(true);
  });

  it("shouldn't contain and value is empty", async () => {
    const event = {
      prop1: "Some text here"
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "does not contain",
            propertyValue: ""
          }
        ]
      })
    ).toEqual(false);
  });
  it("shouldn't contain but contains", async () => {
    const event = {
      prop1: "Some text here"
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "does not contain",
            propertyValue: "text"
          }
        ]
      })
    ).toEqual(false);
  });
  it("shouldn't match start with", async () => {
    const event = {
      prop1: "Val"
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "starts with",
            propertyValue: "123"
          }
        ]
      })
    ).toEqual(false);
  });
  it("should match start with", async () => {
    const event = {
      prop1: "Hello"
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "starts with",
            propertyValue: "Hell"
          }
        ]
      })
    ).toEqual(true);
  });
  it("shouldn't match start with with empty value", async () => {
    const event = {
      prop1: ""
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "starts with",
            propertyValue: "Hell"
          }
        ]
      })
    ).toEqual(false);
  });
  it("shouldn't match does not start with", async () => {
    const event = {
      prop1: "Val"
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "does not start with",
            propertyValue: "123"
          }
        ]
      })
    ).toEqual(true);
  });
  it("should match does not start with", async () => {
    const event = {
      prop1: "Hello"
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "does not start with",
            propertyValue: "Hell"
          }
        ]
      })
    ).toEqual(false);
  });
  it("shouldn't match does not start with with empty value", async () => {
    const event = {
      prop1: ""
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "does not start with",
            propertyValue: "Hell"
          }
        ]
      })
    ).toEqual(true);
  });
  it("shouldn't match ends with", async () => {
    const event = {
      prop1: "Val"
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "ends with",
            propertyValue: "123"
          }
        ]
      })
    ).toEqual(false);
  });
  it("should match ends with", async () => {
    const event = {
      prop1: "Hello"
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "ends with",
            propertyValue: "ello"
          }
        ]
      })
    ).toEqual(true);
  });
  it("shouldn't match start with with empty value", async () => {
    const event = {
      prop1: ""
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "ends with",
            propertyValue: "Hell"
          }
        ]
      })
    ).toEqual(false);
  });
  it("shouldn't match does not end with", async () => {
    const event = {
      prop1: "Val"
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "does not end with",
            propertyValue: "123"
          }
        ]
      })
    ).toEqual(true);
  });
  it("should match ends with", async () => {
    const event = {
      prop1: "Hello"
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "does not end with",
            propertyValue: "ello"
          }
        ]
      })
    ).toEqual(false);
  });
  it("shouldn't match start with with empty value", async () => {
    const event = {
      prop1: ""
    };
    expect(
      eventPassesFilters({
        event,
        filters: [
          {
            propertyName: "prop1",
            condition: "does not end with",
            propertyValue: "Hell"
          }
        ]
      })
    ).toEqual(true);
  });
});
