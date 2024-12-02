import streamlit as st
import google.generativeai as genai
import requests
import json

# Configure GenAI Key
API_KEY = 'AIzaSyBnouLDWPWSX7qc-OE0gbvOS4kzbvruI8o'  # Replace with your secure method for storing the API key
genai.configure(api_key=API_KEY)

# Page config
st.set_page_config(layout="wide", page_title="Corporate Carbon Emissions Tracker", page_icon="🌍")
hide_st_style = """
            <style>
            #MainMenu {visibility: hidden;}
            footer {visibility: hidden;}
            header {visibility: hidden;}
            </style>
            """
st.markdown(hide_st_style, unsafe_allow_html=True)

# Inject Custom CSS
st.markdown(
    """
    <style>
        .stApp {
            background: linear-gradient(135deg, #e8f5e9, #f9fbe7); /* Light green gradient */
            color: #333333; /* Default text color */
            font-family: 'Arial', sans-serif;
        }
    .main-title {
        font-size: 40px;
        color: #2e8b57;
        text-align: center;
        font-weight: bold;
        margin-top: 20px;
    }
    .suggestions {
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        padding: 20px;
        margin: 20px 0;
    }
    .suggestion-item {
        padding: 5px 0;
        border-bottom: 1px solid #ddd;
    }
    .suggestion-item:last-child {
        border-bottom: none;
    }
    .button-container {
        text-align: center;
        margin: 20px 0;
    }
    .success-message {
        color: #4caf50;
        font-weight: bold;
        font-size: 18px;
        margin: 20px 0;
    }
   [data-testid="stSidebar"] {
            background: linear-gradient(135deg, #d7f3dc, #c4e3cc); /* Eco green gradient */
            color: #1E8E3E; /* Text color for sidebar content */
            font-family: 'Arial', sans-serif;
            padding: 10px;
        }
        /* Sidebar header styling */
        .sidebar-header {
            font-size: 20px;
            font-weight: bold;
            color: #2E7D32; /* Dark green */
            margin-bottom: 10px;
        }

        /* Sidebar description styling */
        .sidebar-description {
            font-size: 14px;
            color: #388E3C; /* Slightly lighter green */
            margin-bottom: 15px;
        }

        /* Input labels in the sidebar */
        [data-testid="stSidebar"] label {
            color: #1B5E20; /* Deep eco-green */
        }

        /* Styling number input and sliders */
        [data-testid="stSidebar"] .stNumberInput, 
        [data-testid="stSidebar"] .stSlider {
            background: #f1f8e9; /* Very light green for inputs */
            border: 1px solid #aed581; /* Soft green border */
        }
         .ai-message {
            font-size: 20px;
            font-weight: normal;
            color: #1E8E3E; /* Green color for sustainability */
            background-color: #e8f5e9; /* Light green background */
            padding: 10px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
            margin-top: 20px;
        }

          .right-button {
            display: flex;
            justify-content: center; /* Aligns to the left but with a small margin */
            margin-left: 100%; /* Adjust this percentage to shift the button to the right */
            margin-top: 20px;
        }
        
        .success-message {
            font-size: 18px;
            font-weight: bold;
            color: #4CAF50; /* Green color for success */
            background-color: #d4edda; /* Light green background */
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            margin-bottom: 20px;
        }
        .suggestions {
            font-size: 16px;
            font-weight: bold;
            color: #333;
            margin-top: 20px;
        }
        .suggestion-item {
            font-size: 14px;
            color: #555;
            margin-bottom: 10px;
        }
    </style>
""", unsafe_allow_html=True)

# Add buttons for navigation
# Add navigation buttons in one line with small font
st.sidebar.markdown(
    """
    <style>
        .nav-buttons {
            display: flex;
            justify-content: space-between;
            font-size: 12px; /* Smaller font size */
        }
        .nav-buttons button {
            background-color: #aed581; /* Light green background */
            border: none;
            color: #1E8E3E; /* Eco green font color */
            padding: 5px 10px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 12px;
            border-radius: 5px;
            cursor: pointer;
            margin: 2px;
        }
        .nav-buttons button:hover {
            background-color: #d7f3dc; /* Slightly darker green on hover */
        }
    </style>
     <div class="nav-buttons">
        <form action="http://localhost:3000" method="get">
            <button type="submit">Home</button>
        </form>
        <form action="http://localhost:3000/marketplace" method="get">
            <button type="submit">MarketPlace</button>
        </form>
        <form action="http://localhost:3000/insights" method="get">
            <button type="submit">Insights</button>
        </form>
    </div>
    """, unsafe_allow_html=True
)

# Sidebar input for chatbot interaction
st.sidebar.markdown('<div class="sidebar-header">Carbon Emissions Chatbot</div>', unsafe_allow_html=True)
st.sidebar.markdown('<div class="sidebar-description">Enter the required details below for calculating CO₂ emissions.</div>', unsafe_allow_html=True)

company_name = st.sidebar.text_input("Company Name", value="")
electricity_usage = st.sidebar.number_input("Electricity Consumption (kWh)", value=0)
data_center_usage = st.sidebar.number_input("Data Center Energy (kWh)", value=0)
pue = st.sidebar.slider("Power Usage Effectiveness (PUE)", min_value=1.0, max_value=2.0, value=1.5)
transportation_distance = st.sidebar.number_input("Distance Traveled by Company Vehicles (km)", value=0)
fuel_consumption = st.sidebar.number_input("Fuel Consumption (liters)", value=0)
cloud_compute_hours = st.sidebar.number_input("Cloud Compute Usage (VM hours)", value=0)
data_storage = st.sidebar.number_input("Cloud Storage Used (TB)", value=0)
data_transfer = st.sidebar.number_input("Data Transfer (TB)", value=0)

def generate_dynamic_suggestions(electricity_usage, data_center_usage, pue, transportation_distance, 
                                 fuel_consumption, cloud_compute_hours, data_storage, data_transfer):
    suggestions = []
    
    # Electricity usage optimization
    if electricity_usage > 800:
        suggestions.append("Switch to renewable energy sources like solar or wind to reduce electricity emissions.")
    elif 500 < electricity_usage <= 800:
        suggestions.append("Your electricity usage is already low. Focus on maintaining energy efficiency.")
    elif electricity_usage <= 500:
        suggestions.append("Looking good! Maintain your current energy-saving practices.")

    # Data center energy optimization
    if data_center_usage > 600:
        suggestions.append("Optimize server utilization or migrate workloads to energy-efficient data centers.")
    elif data_center_usage <= 600:
        suggestions.append("Improve Power Usage Effectiveness (PUE) by investing in better cooling systems.")

    # Transportation optimization
    if transportation_distance > 700 or fuel_consumption > 500:
        suggestions.append("Encourage carpooling or transition to electric vehicles to reduce transportation emissions.")
    elif transportation_distance <= 700:
        suggestions.append("Transportation emissions are minimal. Focus on other categories for optimization.")

    # Cloud compute optimization
    if cloud_compute_hours > 600:
        suggestions.append("Scale resources dynamically to reduce unused compute hours and emissions.")
    elif cloud_compute_hours <= 600:
        suggestions.append("Cloud compute usage is efficient. Consider exploring further optimizations in other areas.")

    # Cloud storage optimization
    if data_storage > 5:
        suggestions.append("Archive infrequently accessed data or delete redundant files to save storage energy.")
    elif data_storage <= 5:
        suggestions.append("Your data storage usage is efficient. Maintain current practices.")

    # Data transfer optimization
    if data_transfer >= 1000:
        suggestions.append("Use optimized data transfer protocols to reduce bandwidth and energy consumption.")
    elif data_transfer < 1000:
        suggestions.append("Data transfer is minimal. No immediate actions required.")

    # General recommendations
    if all([
        electricity_usage <= 500,
        data_center_usage <= 600,
        transportation_distance <= 700,
        cloud_compute_hours <= 600,
        data_storage <= 5,
        data_transfer < 1000
    ]):
        suggestions.append("Your operations are running efficiently! Keep monitoring to maintain these standards.")

    return suggestions


def generate_emissions_data(prompt):
    try:
        model = genai.GenerativeModel("gemini-1.5-pro")
        response = model.generate_content(prompt)
        return response.text
    except AttributeError as e:
        st.error("Method not found in `google.generativeai`. Check library documentation and update your code.")
    except Exception as e:
        st.error(f"An unexpected error occurred: {str(e)}")


def get_emissions_from_genai():
    prompt = (
        f"Calculate the carbon emissions in kilograms (kg CO₂) for the following data based on these formulas:\n"
        f"1. Electricity CO₂ emissions = Electricity Usage (kWh) × 0.45 (kg CO₂ per kWh)\n"
        f"2. Data Center CO₂ emissions = Data Center Energy (kWh) × 1.0 (kg CO₂ per kWh) × PUE\n"
        f"3. Transportation CO₂ emissions = (Distance Traveled (km) × 0.3 (kg CO₂ per km)) + (Fuel Consumption (liters) × 2.31 (kg CO₂ per liter))\n"
        f"4. Cloud Compute CO₂ emissions = Compute Hours × 0.5 (kg CO₂ per compute hour)\n"
        f"5. Cloud Storage CO₂ emissions = Storage Used (TB) × 75 (kg CO₂ per TB/month)\n"
        f"6. Data Transfer CO₂ emissions = Data Transfer (TB) × 100 (kg CO₂ per TB)\n"
        f"Provide the breakdown of emissions by category and calculate the total CO₂ emissions.\n\n"
        f"Input data:\n"
        f"- Electricity Usage: {electricity_usage} kWh\n"
        f"- Data Center Energy: {data_center_usage} kWh\n"
        f"- PUE: {pue}\n"
        f"- Transportation Distance: {transportation_distance} km\n"
        f"- Fuel Consumption: {fuel_consumption} liters\n"
        f"- Cloud Compute Hours: {cloud_compute_hours} hours\n"
        f"- Data Storage: {data_storage} TB\n"
        f"- Data Transfer: {data_transfer} TB\n"
    )
    response_text = generate_emissions_data(prompt)
    return response_text

# Function to submit data to backend
def submit_emissions_to_backend(data):
    try:
        url = "http://localhost:5000/ai"  # Replace with your backend API endpoint
        headers = {'Content-Type': 'application/json'}
        response = requests.post(url, data=json.dumps(data), headers=headers)
        
        if response.status_code == 200:
            st.success("Data submitted successfully!")
        else:
            st.error(f"Failed to submit data: {response.text}")
    except Exception as e:
        st.error(f"Error connecting to backend: {str(e)}")

# Display chatbot-like UI and calculate emissions
st.markdown('<div class="main-title">Corporate Carbon Emissions Tracker</div>', unsafe_allow_html=True)

st.markdown('<div class="ai-message">Harness the power of AI to track and reduce your carbon footprint for a greener tomorrow</div>', unsafe_allow_html=True)

with st.container():
    st.markdown('<div class="center-button">', unsafe_allow_html=True)
    if st.button("Calculate Emissions"):
        emissions_data = get_emissions_from_genai()
        if emissions_data:
            st.markdown('<div class="success-message">Emissions calculated successfully!</div>', unsafe_allow_html=True)
            st.header("Emissions Breakdown and Total CO₂ Emissions")
            st.write(emissions_data)

            # Prepare data to send to backend
            data = {
                "company_name": company_name,
                "electricity_usage": electricity_usage,
                "data_center_usage": data_center_usage,
                "pue": pue,
                "transportation_distance": transportation_distance,
                "fuel_consumption": fuel_consumption,
                "cloud_compute_hours": cloud_compute_hours,
                "data_storage": data_storage,
                "data_transfer": data_transfer,
                "emissions_data": emissions_data,
            }

            # Send data to backend
            submit_emissions_to_backend(data)

            # Generate Suggestions
            suggestions = generate_dynamic_suggestions(
                electricity_usage, data_center_usage, pue, transportation_distance, 
                fuel_consumption, cloud_compute_hours, data_storage, data_transfer
            )

            # Display Suggestions with Custom HTML
            st.markdown('<div class="suggestions"><b>Recommended Emission Reduction Measures:</b></div>', unsafe_allow_html=True)
            for i, suggestion in enumerate(suggestions, start=1):
                st.markdown(f'<div class="suggestion-item">{i}. {suggestion}</div>', unsafe_allow_html=True)
        else:
            st.error("Unable to calculate emissions at this time. Please try again.")
    st.markdown('</div>', unsafe_allow_html=True)
