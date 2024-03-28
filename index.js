//This is in here because I am having issues with JS Fiddle doing a dropdown
$(document).ready(function() {
  console.log("Document is ready"); // Check if document ready

  
// Update the selected store in the navbar
  $('.navbar-nav').on('click', '.dropdown-item', function() {
    console.log("Dropdown item clicked"); // Check if dropdown is clicked
    var selectedStore = $(this).data('store');
    console.log("Selected Store:", selectedStore); // Check store clicked
    $('#storeDropdown').text(selectedStore);
  });

  $("#taxable-btn").click(function(){
    console.log("tax");
    $("#not-taxable-btn").removeClass("btn-primary");
    $("#taxable-btn").removeClass("btn-outline-primary");
    
    $("#not-taxable-btn").addClass("btn-outline-primary");
    $("#taxable-btn").addClass("btn-primary");
});

$("#not-taxable-btn").click(function(){
    console.log("not");
    $("#not-taxable-btn").removeClass("btn-outline-primary");
    $("#taxable-btn").removeClass("btn-primary");
    
    $("#not-taxable-btn").addClass("btn-primary");
    $("#taxable-btn").addClass("btn-outline-primary");
});

});


// Event listener for product title input
  $('.product-title').on('input', function() {

// Simulate fetching SKU from database based on entered product title
    var productTitle = $(this).val();
    var sku = fetchSkuFromDatabase(productTitle); // Function to simulate database fetch for SKU
    // Update SKU input in the same row
    $(this).closest('tr').find('td:eq(0) input').val(sku);

    // Simulate fetching unit cost from database based on entered product title
    var unitCost = fetchUnitCostFromDatabase(productTitle); // Function to simulate database fetch for unit cost
    // Update unit cost input in the same row
    $(this).closest('tr').find('.unit-cost').val('$' + unitCost.toFixed(2)); // Format as currency
    console.log("The value of unit-cost is now: " + unitCost);

    // Simulate fetching retail price from database based on entered product title
    var retailPrice = fetchRetailPriceFromDatabase(productTitle); // Function to simulate database fetch for Retail Price
    // Update retail price input in the same row
    $(this).closest('tr').find('.retail-price').val('$' + retailPrice.toFixed(2)); // Format as currency

    // Calculate and update extended line total
    updateExtendedLineTotal($(this).closest('tr'));

    // Calculate and update profit
    updateProfit($(this).closest('tr'));
});

// Function to simulate fetching SKU from database
function fetchSkuFromDatabase(productTitle) {
    // Simulate database fetch (hardcoded value for demonstration)
    return "8GB-9028";
};

// Function to simulate fetching unit cost from database
function fetchUnitCostFromDatabase(productTitle) {
  // Simulate database fetch (hardcoded value for demonstration)
  return 40.00;
}

// Function to simulate fetching retail price from database
function fetchRetailPriceFromDatabase(productTitle) {
  // Simulate database fetch (hardcoded value for demonstration)
  return 55.00;
}

// Function to simulate submission to the database
function submitToDatabase(price) {
  // Simulate database submission
  console.log('Submitting price to the database:', price);
}

// Increment quantity button
$('.increment-btn').click(function() {
  var inputField = $(this).closest('tr').find('.quantity');
  var currentValue = parseInt(inputField.val());
  if (!isNaN(currentValue)) {
      inputField.val(currentValue + 1);
  } else {
      inputField.val(1);
  }
  updateExtendedLineTotal($(this).closest('tr'));
  updateProfit($(this).closest('tr'));
});

// Decrement quantity button
$('.decrement-btn').click(function() {
  var inputField = $(this).closest('tr').find('.quantity');
  var currentValue = parseInt(inputField.val());
  if (!isNaN(currentValue) && currentValue > 0) {
      inputField.val(currentValue - 1);
  } else {
      inputField.val(0);
  }
  updateExtendedLineTotal($(this).closest('tr'));
  updateProfit($(this).closest('tr'));
});

$('#submitBtn').click(function() {
  // Get the value entered in the "Price ($)" field
  var price = parseFloat($('.price').val());
  
  // Check if something has been entered
  if (isNaN(price)) {
      alert('Please enter a valid price.');
      return;
  }
  
  // Simulate submission to the database (for demonstration purposes)
  submitToDatabase(price);
});

// Event listener for Price ($) and Quantity inputs
$('.price, .quantity').on('input', function() {
  updateExtendedLineTotal($(this).closest('tr'));
  updateProfit($(this).closest('tr'));
});

// Function to update the Extended (Line Total) based on Price ($) and Quantity
function updateExtendedLineTotal(row) {
  var price = parseFloat(row.find('.price').val());
  var quantity = parseInt(row.find('.quantity').val());
  
  if (!isNaN(price) && !isNaN(quantity)) {
      var extendedTotal = price * quantity;
      row.find('.extended-line-total').val('$' + extendedTotal.toFixed(2));
  } else {
      row.find('.extended-line-total').val('');
  }
}

// Function to update Profit based on ( (Price - Unit Cost) / Unit Cost) Format like $76 (10%)
function updateProfit(row) {
  var price = parseFloat(row.find('.price').val());
  var currentUnitCostValue = ( row.find('.unit-cost').val() );
  var unitCost = parseFloat(removeDollarSign(currentUnitCostValue));
  var quantity = parseInt(row.find('.quantity').val());

  if (!isNaN(price) && !isNaN(unitCost) && !isNaN(quantity)) {
    var profitDollars  = ((price - unitCost) * quantity);
    var profitPercent = (((price - unitCost) / unitCost) * 100);
    var profitDollarsPerItem = ((price - unitCost) / quantity);
    row.find('.profit').val('$' + profitDollars.toFixed(2) + ' (' + profitPercent.toFixed(1) + '%)');
  } else {
    row.find('.profit').val('0');
  }
}

// Cleans up the $ from unit cost
function removeDollarSign(rawUnitCostNumber) {
  var rawUnitCostString = rawUnitCostNumber.toString().slice(1, 6);
  return (rawUnitCostString);
}